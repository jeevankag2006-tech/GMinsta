/* ============================================
   GMinsta - Express Server
   ============================================ */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'GMinsta API Server Running',
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 GMinsta Server running on http://localhost:${PORT}`);
});

module.exports = app;