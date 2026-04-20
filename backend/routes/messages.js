/* ============================================
   GMinsta - Messages Routes
   ============================================ */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get messages with a user
router.get('/:userId', authMiddleware, async(req, res) => {
    try {
        const userId = req.params.userId;
        const connection = await pool.getConnection();

        const [messages] = await connection.query(`
            SELECT * FROM messages 
            WHERE (sender_id = ? AND receiver_id = ?) 
               OR (sender_id = ? AND receiver_id = ?)
            ORDER BY created_at ASC
        `, [req.userId, userId, userId, req.userId]);

        connection.release();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});

// Send message
router.post('/:userId', authMiddleware, async(req, res) => {
    try {
        const receiverId = req.params.userId;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message text is required' });
        }

        const connection = await pool.getConnection();

        const [result] = await connection.query(
            'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)', [req.userId, receiverId, message]
        );

        connection.release();

        res.status(201).json({
            message: 'Message sent successfully',
            messageId: result.insertId
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;