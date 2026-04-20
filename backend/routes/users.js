/* ============================================
   GMinsta - Users Routes
   ============================================ */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Get all users (for chat)
router.get('/', authMiddleware, async(req, res) => {
    try {
        const connection = await pool.getConnection();

        const [users] = await connection.query(`
            SELECT id, username, email FROM users WHERE id != ?
        `, [req.userId]);

        connection.release();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Get user profile
router.get('/:id', authMiddleware, async(req, res) => {
    try {
        const userId = req.params.id;
        const connection = await pool.getConnection();

        const [users] = await connection.query(
            'SELECT id, username, email, avatar FROM users WHERE id = ?', [userId]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Get user posts
        const [posts] = await connection.query(`
            SELECT 
                p.*,
                (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count
            FROM posts p
            WHERE p.user_id = ?
            ORDER BY p.created_at DESC
        `, [userId]);

        // Get follower/following counts
        const [followers] = await connection.query(
            'SELECT COUNT(*) as count FROM followers WHERE following_id = ?', [userId]
        );

        const [following] = await connection.query(
            'SELECT COUNT(*) as count FROM followers WHERE follower_id = ?', [userId]
        );

        const [followerUsers] = await connection.query(
            `SELECT u.id, u.username
             FROM followers f
             JOIN users u ON f.follower_id = u.id
             WHERE f.following_id = ?`, [userId]
        );

        const [followingUsers] = await connection.query(
            `SELECT u.id, u.username
             FROM followers f
             JOIN users u ON f.following_id = u.id
             WHERE f.follower_id = ?`, [userId]
        );

        connection.release();

        connection.release();

        res.json({
            ...user,
            avatar: user.avatar,
            posts: posts,
            posts_count: posts.length,
            followers_count: followers[0].count,
            following_count: following[0].count,
            followers: followerUsers,
            following: followingUsers
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
});

router.post('/avatar', authMiddleware, upload.single('avatar'), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Avatar image is required' });
        }

        const avatarPath = `/uploads/${req.file.filename}`;
        const connection = await pool.getConnection();
        await connection.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, req.userId]);
        connection.release();

        res.json({ message: 'Avatar updated successfully', avatar: avatarPath });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ message: 'Failed to update avatar' });
    }
});

module.exports = router;