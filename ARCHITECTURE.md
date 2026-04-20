# 🎯 GMinsta - Architecture & Flow Guide

## System Architecture (3-Tier)

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  (HTML, CSS, JavaScript in Browser)                         │
│  - UI Components: Login, Feed, Profile, Chat                │
│  - Client-side validation                                   │
│  - localStorage for session management                      │
└─────────────────────────────────────────────────────────────┘
                            ↕
                     HTTP / JSON / JWT
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                    │
│  (Node.js + Express Backend)                                │
│  - Authentication (Login/Register)                          │
│  - Post management (CRUD)                                   │
│  - Comment & Like logic                                     │
│  - Messaging system                                         │
│  - Middleware: Auth verification, CORS                      │
└─────────────────────────────────────────────────────────────┘
                            ↕
                          SQL
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  (MySQL Database)                                           │
│  - Users, Posts, Comments, Likes, Messages, Followers      │
│  - Indexes for optimization                                │
│  - Foreign keys for referential integrity                  │
└─────────────────────────────────────────────────────────────┘
```

## User Journey Flows

### 1. Authentication Flow
```
User Opens App
    ↓
Check localStorage for token
    ↓
Token exists? 
    ├─ YES → Go to Feed Page
    └─ NO → Show Login Page
    ↓
User enters credentials
    ↓
Frontend validates format
    ↓
GET request: POST /api/auth/login
    ↓
Backend verifies email & password
    ↓
Generate JWT token
    ↓
Store token + user info
    ↓
Display Feed
```

### 2. Post Creation Flow
```
User clicks "Create"
    ↓
User selects image
    ↓
Preview shows image
    ↓
User adds caption
    ↓
User clicks "Post"
    ↓
Frontend validates (image + caption)
    ↓
Send FormData: POST /api/posts
    ↓
Backend saves image to disk
    ↓
Insert post record in DB
    ↓
Return success
    ↓
Redirect to Feed
    ↓
Reload posts (new post appears at top)
```

### 3. Like System Flow
```
User views post
    ↓
User clicks heart icon
    ↓
Check if already liked in DB
    ↓
Already liked?
    ├─ YES → Delete from likes table (Unlike)
    └─ NO → Insert into likes table (Like)
    ↓
Get updated like count
    ↓
Update UI (heart color + count)
```

### 4. Messaging Flow
```
User goes to Chat
    ↓
Fetch all users
    ↓
Display conversation list
    ↓
User searches/selects contact
    ↓
Load messages with that user
    ↓
User types message
    ↓
User clicks Send
    ↓
POST /api/messages/:userId
    ↓
Backend inserts message
    ↓
Display in chat
```

## Component Breakdown

### Frontend Structure

```
index.html (One-page app)
├── Login Page (#login-page)
│   └── auth-form
│       ├── Email input
│       ├── Password input
│       └── Submit button
│
├── Register Page (#register-page)
│   └── auth-form
│       ├── Username input
│       ├── Email input
│       ├── Password input
│       ├── Confirm password input
│       └── Submit button
│
├── Feed Page (#feed-page)
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation links
│   │   └── Logout button
│   └── Posts Feed
│       └── Post Card (repeated)
│           ├── Header (Avatar + Username)
│           ├── Image
│           ├── Caption
│           ├── Like button
│           ├── Comment button
│           └── Comments section
│
├── Create Page (#create-page)
│   └── Create Form
│       ├── Image upload
│       ├── Caption textarea
│       └── Post button
│
├── Profile Page (#profile-page)
│   ├── Profile header
│   │   ├── Avatar
│   │   ├── Username
│   │   ├── Stats (Posts, Followers, Following)
│   │   └── Bio
│   └── User Posts Grid
│       └── Post thumbnails
│
└── Chat Page (#chat-page)
    ├── Sidebar
    │   ├── Search users
    │   └── Conversations list
    └── Chat main
        ├── Chat header
        ├── Messages area
        │   ├── Sent messages (right)
        │   └── Received messages (left)
        └── Input area
```

### Backend API Structure

```
Express Server (Port: 5000)
├── /api/auth
│   ├── POST /register → Create user account
│   └── POST /login → Verify credentials, return token
│
├── /api/posts
│   ├── GET / → Fetch all posts with details
│   ├── POST / → Create new post (with image)
│   ├── POST /:id/like → Like/unlike post
│   └── POST /:id/comments → Add comment
│
├── /api/messages
│   ├── GET /:userId → Fetch messages with user
│   └── POST /:userId → Send message
│
└── /api/users
    ├── GET / → Get all users (for chat)
    └── GET /:id → Get user profile + posts
```

### Database Schema

```
users (id, username, email, password, ...)
    ↓ 1-to-many
posts (id, user_id, image, caption, ...)
    ├─ 1-to-many → comments (id, post_id, user_id, text, ...)
    │
    ├─ 1-to-many → likes (id, post_id, user_id, ...)
    │
    └─ junction table
    
messages (id, sender_id, receiver_id, message, ...)
    ↑
    └─ references users table

followers (id, follower_id, following_id, ...)
    ↑
    └─ references users table
```

## Key Concepts Explained

### 1. JWT Authentication
- User logs in → Backend generates token
- Token = encrypted user ID + timestamp
- Client stores token in localStorage
- Client sends token in headers for all requests
- Backend verifies token before processing request
- If token invalid → redirect to login

### 2. Password Security
- Plain password sent to backend
- Backend hashes using bcryptjs (salt rounds: 10)
- Hashed password stored in DB
- On login: hash provided password, compare with stored hash
- Never store plain passwords!

### 3. Image Upload (Multer)
- User selects file from computer
- FormData object created with file
- Frontend sends multipart/form-data
- Backend receives with multer middleware
- Image saved to /uploads folder
- Path stored in database

### 4. Relational Database
- Foreign keys create relationships
- ON DELETE CASCADE: if user deleted, their posts/comments deleted too
- Indexes on foreign keys for faster queries
- UNIQUE constraints prevent duplicates (e.g., one like per post per user)

## Response Examples

### Login Success
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com"
  }
}
```

### Get Posts
```json
[
  {
    "id": 1,
    "user_id": 1,
    "image": "/uploads/1705123456789.jpg",
    "caption": "Amazing sunset!",
    "likes_count": 42,
    "comments_count": 5,
    "isLiked": true,
    "created_at": "2024-01-13T10:30:00Z",
    "user": {
      "id": 1,
      "username": "john",
      "email": "john@example.com"
    },
    "comments": [
      {
        "id": 1,
        "text": "Beautiful!",
        "username": "jane"
      }
    ]
  }
]
```

## Performance Optimizations

1. **Database Indexes**
   - user_id in posts, comments, likes
   - Speeds up queries that filter by user
   
2. **Lazy Loading**
   - Load only visible posts initially
   - Load more on scroll (future enhancement)

3. **Caching**
   - localStorage caches user session
   - Prevents repeated login requests

4. **Query Joins**
   - Fetch user info with posts in one query
   - Reduces database round trips

## Security Features

1. **JWT Authentication**
   - Stateless token-based auth
   - Token expires (can be added)
   
2. **Password Hashing**
   - bcryptjs with salt rounds
   - One-way hash, cannot be reversed

3. **Input Validation**
   - Frontend: Email format, password length
   - Backend: Type checking, string sanitization

4. **CORS**
   - Only allow requests from trusted origins
   - Prevent unauthorized cross-domain requests

5. **Authorization**
   - User can only modify their own posts
   - Middleware checks user ID matches (to be added)

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cannot connect to database | Check MySQL running, verify credentials in .env |
| Images not showing | Check /uploads folder exists, verify file path |
| JWT token invalid | Logout and login again to get new token |
| CORS error | Backend /cors already configured |
| Emails not validating | Check regex pattern in auth.js |

## Testing Guide

### Manual Testing Checklist
- [ ] Register new account → DB check
- [ ] Login with wrong password → Error message
- [ ] Create post with image → File saved, DB record created
- [ ] Like post → Count increases
- [ ] Like again → Count decreases (unlike)
- [ ] Send message → Message appears
- [ ] Refresh page → Session maintained via token
- [ ] Logout → localStorage cleared, redirect to login

### API Testing (using cURL or Postman)
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Test get posts with token
curl -X GET http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Good luck with your presentation! 🎓
