/* ============================================
   GMinsta - Posts Routes
   ============================================ */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Get all posts
router.get('/', authMiddleware, async(req, res) => {
    try {
        const connection = await pool.getConnection();

        const [posts] = await connection.query(`
            SELECT 
                p.*,
                u.id as user_id,
                u.username,
                u.email,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);

        // Get comments for each post
        for (let post of posts) {
            const [comments] = await connection.query(`
                SELECT c.*, u.username FROM comments c
                JOIN users u ON c.user_id = u.id
                WHERE c.post_id = ?
            `, [post.id]);
            post.comments = comments;

            // Check if current user liked the post
            const [liked] = await connection.query(
                'SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [post.id, req.userId]
            );
            post.isLiked = liked.length > 0;

            // Add user object
            post.user = {
                id: post.user_id,
                username: post.username,
                email: post.email
            };
        }

        connection.release();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
});

// Create post
router.post('/', authMiddleware, upload.single('image'), async(req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const connection = await pool.getConnection();

        const [result] = await connection.query(
            'INSERT INTO posts (user_id, image, caption) VALUES (?, ?, ?)', [req.userId, image, caption]
        );

        connection.release();

        res.status(201).json({
            message: 'Post created successfully',
            postId: result.insertId
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

// Like post
router.post('/:id/like', authMiddleware, async(req, res) => {
    try {
        const postId = req.params.id;
        const connection = await pool.getConnection();

        // Check if already liked
        const [existing] = await connection.query(
            'SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, req.userId]
        );

        if (existing.length > 0) {
            // Unlike
            await connection.query(
                'DELETE FROM likes WHERE post_id = ? AND user_id = ?', [postId, req.userId]
            );
        } else {
            // Like
            await connection.query(
                'INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, req.userId]
            );
        }

        // Get updated likes count
        const [likes] = await connection.query(
            'SELECT COUNT(*) as count FROM likes WHERE post_id = ?', [postId]
        );

        connection.release();

        res.json({
            message: existing.length > 0 ? 'Post unliked' : 'Post liked',
            likes_count: likes[0].count
        });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Failed to like post' });
    }
});

// Add comment
router.post('/:id/comments', authMiddleware, async(req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const connection = await pool.getConnection();

        const [result] = await connection.query(
            'INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)', [postId, req.userId, text]
        );

        connection.release();

        res.status(201).json({
            message: 'Comment added successfully',
            commentId: result.insertId
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;