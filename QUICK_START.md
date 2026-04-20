# ⚡ GMinsta - Quick Setup Guide (5 Minutes)

## Step 1: Set Up Database (2 min)

```bash
# Open MySQL
mysql -u root -p

# Paste this entire content:
CREATE DATABASE IF NOT EXISTS gminsta;
USE gminsta;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Likes table
CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Followers table
CREATE TABLE followers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_follow (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
```

✅ Done! All tables created

## Step 2: Start Backend (1.5 min)

```bash
cd backend

# Copy example env
cp .env.example .env

# Install packages
npm install

# Start server
npm start
```

Expected output:
```
✅ Database connected successfully
🚀 GMinsta Server running on http://localhost:5000
```

## Step 3: Start Frontend (1.5 min)

### Option A: Live Server (VS Code)
1. Right-click `frontend/index.html`
2. Click "Open with Live Server"
3. Opens at http://localhost:5500

### Option B: Python
```bash
cd frontend
python3 -m http.server 8000
# Open http://localhost:8000
```

✅ App is running!

## Test It Out

1. **Register**: Click "Sign up here" link
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`

2. **Login**: Use credentials above

3. **Create Post**:
   - Click `Create` in navbar
   - Select image from computer
   - Add caption: "My first post!"
   - Click `Post`

4. **Like & Comment**:
   - Go back to Feed
   - Click heart to like
   - Add a comment

5. **Chat**:
   - Create another account first
   - Go to Chat
   - Search second account username
   - Send message

## Troubleshooting

### Frontend shows blank page
- Check browser console (F12)
- Check API_URL in `frontend/js/app.js` is `http://localhost:5000/api`
- Backend must be running

### Cannot login
- Check database tables created with `SHOW TABLES;`
- Try registering new account first
- Check browser localStorage is enabled

### Images won't upload
- Create `backend/uploads` folder if missing
- Check file permissions: `chmod -R 755 uploads`

### Database connection error
- MySQL must be running: `systemctl status mysql` or `brew services list`
- Check credentials in `backend/.env`
- Common: Remove password from .env if no password set

## What to Show in Presentation

### Code Structure
```
"Here's our 3-tier architecture..."
- Show frontend/index.html (one-page design)
- Show backend/server.js (entry point)
- Show database/schema.sql (7 tables)
```

### Key Features Demo
1. **Register & Login** - JWT authentication
2. **Post Creation** - Image upload with multer
3. **Like System** - Real-time count updates
4. **Messaging** - Multi-user chat
5. **Profile** - User statistics

### Code Quality Points
- Clean project structure
- Responsive design (mobile-first)
- Error handling & validation
- Database relationships
- Secure password hashing
- RESTful API design

## File Sizes
- index.html: ~8 KB
- style.css: ~15 KB
- All .js files combined: ~12 KB
- Schema: Simple & normalized
- Total frontend: < 50 KB (super light!)

## Features Checklist
- ✅ Login/Register with validation
- ✅ JWT authentication
- ✅ Create posts with image upload
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ User profile page
- ✅ User statistics
- ✅ One-to-one messaging
- ✅ Search users
- ✅ Modern responsive UI
- ✅ Smooth animations
- ✅ Mobile-friendly design

## Database Info
- **DBMS**: MySQL
- **Tables**: 7 (Users, Posts, Comments, Likes, Messages, Followers)
- **Relationships**: Proper foreign keys
- **Optimization**: Indexed queries
- **Normalization**: 3NF compliant

Good luck! 🚀
