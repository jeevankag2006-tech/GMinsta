# 📸 GMinsta - Mini Social Media App

A modern, lightweight social media platform built for students. Similar to Instagram but simplified with essential features.

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login with JWT tokens
- Password encryption with bcryptjs

### 📝 Posts
- Create posts with image upload
- Add captions (500 characters max)
- Like/unlike posts
- Comment on posts
- View all posts in feed

### 👤 Profile
- User profile page with bio
- Display user posts in grid
- Show follower/following counts
- Post statistics

### 💬 Chat
- One-to-one messaging
- Search users to message
- Read message history
- Real-time message bubbles

### 📊 Database
- Relational data structure (MySQL)
- Users, Posts, Comments, Likes, Messages
- Optimized queries with indexes

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Modern styling with gradients & animations
- **JavaScript** - Vanilla JS (no frameworks)
- **Features**: Responsive, Mobile-first, Smooth animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **MySQL** - Database

### Database
- **MySQL** - Relational database
- **7 Tables**: Users, Posts, Comments, Likes, Messages, Followers

## 📁 Project Structure

```
GMinsta/
├── frontend/
│   ├── index.html          # All pages in one file
│   ├── css/
│   │   └── style.css       # Modern styling (600+ lines)
│   └── js/
│       ├── app.js          # Main logic & navigation
│       ├── auth.js         # Login/Register
│       ├── feed.js         # Posts & feed
│       └── chat.js         # Messaging
│
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   ├── config/
│   │   └── database.js     # MySQL connection
│   ├── middleware/
│   │   └── auth.js         # JWT verification
│   └── routes/
│       ├── auth.js         # /api/auth
│       ├── posts.js        # /api/posts
│       ├── messages.js     # /api/messages
│       └── users.js        # /api/users
│
├── database/
│   └── schema.sql          # MySQL schema
│
└── uml-diagrams/
    └── uml-diagrams.md     # Use case, Class, ERD diagrams
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- Code editor (VS Code recommended)

### 1️⃣ Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run schema
source database/schema.sql

# Verify tables
USE gminsta;
SHOW TABLES;
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your DB credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=gminsta

# Start server
npm start

# Expected output: 🚀 GMinsta Server running on http://localhost:5000
```

### 3️⃣ Frontend Setup

Option A: Using VS Code Live Server
```bash
1. Open frontend/index.html
2. Right-click → "Open with Live Server"
3. Port: http://localhost:8000 (or similar)
```

Option B: Using Python
```bash
cd frontend
python3 -m http.server 8000
# Open http://localhost:8000
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### Posts
```
GET    /api/posts             - Get all posts (with likes & comments)
POST   /api/posts             - Create new post (requires image & caption)
POST   /api/posts/:id/like    - Like/unlike post
POST   /api/posts/:id/comments - Add comment to post
```

### Messages
```
GET    /api/messages/:userId  - Get messages with user
POST   /api/messages/:userId  - Send message to user
```

### Users
```
GET    /api/users             - Get all users (for chat)
GET    /api/users/:id         - Get user profile with posts
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (`#6366f1`) - Interactive elements
- **Secondary**: Pink (`#ec4899`) - Accents
- **Background**: White (`#ffffff`) - Main
- **Background Light**: Gray (`#f8fafc`) - Secondary
- **Text Primary**: Dark (`#1e293b`)
- **Text Secondary**: Gray (`#64748b`)

### Fonts
- **Poppins** - Headers, bold text
- **Inter** - Body text, descriptions

### Components
- **Cards**: Rounded (1rem), with shadows
- **Buttons**: Gradient, smooth hover
- **Forms**: Clean inputs with focus states
- **Animations**: Fade, slide, scale effects

## 💾 Database Schema

### Users
```sql
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- avatar
- bio
- created_at
```

### Posts
```sql
- id (PK)
- user_id (FK)
- image
- caption
- created_at
```

### Comments
```sql
- id (PK)
- post_id (FK)
- user_id (FK)
- text
- created_at
```

### Likes
```sql
- id (PK)
- post_id (FK)
- user_id (FK)
- created_at
```

### Messages
```sql
- id (PK)
- sender_id (FK)
- receiver_id (FK)
- message
- is_read
- created_at
```

## 🔄 How It Works

### Authentication Flow
1. User registers with username, email, password
2. Password hashed with bcryptjs
3. User logs in with email & password
4. Backend generates JWT token
5. Token stored in localStorage
6. Token included in all API requests

### Post Creation Flow
1. User uploads image (via multer)
2. User adds caption (max 500 chars)
3. Image saved to `/uploads` folder
4. Post record created in database
5. Feed reloaded with new post

### Like System
1. User clicks heart icon
2. Check if already liked
3. If yes → unlike (delete record)
4. If no → like (insert record)
5. Like count updated in UI

### Chat Flow
1. User selects conversation
2. Messages loaded from database
3. User types and sends message
4. Message inserted in database
5. Chat updates real-time (on page reload/refresh)

## 📖 Key Files Explained

### app.js
- Page navigation system
- API helper functions
- Session checking
- Toast notifications

### auth.js
- Login form handling
- Register form handling
- Email validation
- Password validation

### feed.js
- Load and display posts
- Like/unlike functionality
- Comment submission
- Image preview
- Profile loading

### chat.js
- Conversation list
- Message loading
- Message sending
- User search

### style.css
- Global variables (colors, shadows)
- Responsive grid layout
- Smooth animations
- Mobile-first design

## ⚙️ Deployment Checklist

- [ ] Update JWT_SECRET in backend .env
- [ ] Set NODE_ENV=production
- [ ] Update API_URL in frontend (js/app.js)
- [ ] Configure CORS origins
- [ ] Set up image upload directory
- [ ] Test all API endpoints
- [ ] Test on mobile devices
- [ ] Update database URL for production
- [ ] Set up environment variables

## 🐛 Troubleshooting

### Backend won't start
```
- Check MySQL is running
- Verify DB credentials in .env
- Clear node_modules: rm -rf node_modules && npm install
```

### Frontend can't connect to API
```
- Check backend is running (http://localhost:5000)
- Verify API_URL in js/app.js
- Check CORS settings in server.js
- Check browser console for errors
```

### Images not uploading
```
- Verify multer storage path exists
- Check file permissions in /uploads folder
- Ensure image size < 5MB
```

### Database errors
```
- Run schema.sql: mysql -u root -p gminsta < database/schema.sql
- Check user has permissions
- Verify database name matches .env
```

## 📝 Sample Test Accounts

After running schema.sql, you can create test accounts:

```sql
INSERT INTO users (username, email, password) VALUES 
('john', 'john@example.com', '$2a$10/...'),
('jane', 'jane@example.com', '$2a$10/...');
```

Or register through the app UI.

## 🎯 Future Enhancements

- Real-time notifications (Socket.io)
- Hashtag system
- Story feature (Instagram stories)
- Search posts/users
- User suggestions
- Dark mode
- React/Vue migration
- Progressive Web App (PWA)
- Redis caching
- AWS S3 image storage

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 For Assignment Presentation

This project demonstrates:
- ✅ Full-stack web development
- ✅ Database design & normalization
- ✅ RESTful API design
- ✅ Modern UI/UX principles
- ✅ Security (JWT, password hashing)
- ✅ Responsive design
- ✅ Clean code structure
- ✅ Error handling
- ✅ File upload handling
- ✅ SQL optimization (indexes)

Good luck with your assignment! 🚀
