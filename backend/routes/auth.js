/* ============================================
   GMinsta - Authentication Routes
   ============================================ */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const pool = require('../config/database');

// Register
router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const connection = await pool.getConnection();

        // Check if user exists
        const [existing] = await connection.query(
            'SELECT * FROM users WHERE email = ? OR username = ?', [email, username]
        );

        if (existing.length > 0) {
            connection.release();
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]
        );

        connection.release();

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ message: `Registration failed: ${error.message}` });
    }
});

// Login
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const connection = await pool.getConnection();

        // Find user
        const [users] = await connection.query(
            'SELECT * FROM users WHERE email = ?', [email]
        );

        if (users.length === 0) {
            connection.release();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            connection.release();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        connection.release();

        // Create token
        const token = jwt.encode({ id: user.id },
            process.env.JWT_SECRET || 'your-secret-key'
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

module.exports = router;