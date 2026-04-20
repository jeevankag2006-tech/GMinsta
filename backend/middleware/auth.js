/* ============================================
   GMinsta - Authentication Middleware
   ============================================ */

const jwt = require('jwt-simple');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET || 'your-secret-key');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;