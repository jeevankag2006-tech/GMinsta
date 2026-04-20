# 📘 GMinsta - Complete Project Guide

## 🎯 Project Overview

**GMinsta** is a full-stack social media web application for students. It demonstrates modern web development with a clean 3-tier architecture, professional UI, and complete database normalization.

### Key Stats
- **Frontend**: 40 KB (HTML/CSS/JS)
- **Backend**: Node.js + Express
- **Database**: 7 MySQL tables
- **Pages**: 5 (Login, Register, Feed, Profile, Chat)
- **Features**: 10+ (Auth, Posts, Likes, Comments, Messages)
- **Responsive**: iPhone 5 → 4K monitors

---

## 📋 Documentation Files

### For Getting Started
1. **📄 QUICK_START.md** ← Start here!
   - 5-minute setup guide
   - Copy-paste instructions
   - Troubleshooting tips

2. **📄 README.md** 
   - Comprehensive documentation
   - API endpoints reference
   - Project structure
   - Deployment guide

### For Understanding the System
3. **📄 ARCHITECTURE.md**
   - System design (3-tier)
   - User journeys & flows
   - Component breakdown
   - Performance optimizations

4. **📄 FEATURES_GUIDE.md**
   - Page-by-page walkthrough
   - Component descriptions
   - Design system details
   - User interactions explained

### For Assignment
5. **📄 SUBMISSION_GUIDE.md**
   - What's included checklist
   - Evaluation criteria
   - Presentation script
   - Demo tips
   - Extra features to add

### For UML Diagrams
6. **📄 uml-diagrams.md**
   - Use case diagram
   - Class diagram
   - Entity relationship diagram
   - Sequence diagrams
   - Activity diagram

---

## 🚀 Quick Start (Choose Your Path)

### Path 1: Just Want It Running? (5 minutes)
1. Read: **QUICK_START.md**
2. Follow the 3-step setup
3. Open browser
4. Done!

### Path 2: Need to Understand Everything? (30 minutes)
1. Read: **README.md** (overview)
2. Read: **ARCHITECTURE.md** (how it works)
3. Read: **FEATURES_GUIDE.md** (what each page does)
4. Read code files
5. Run the app

### Path 3: Presenting to Professors? (1 hour)
1. Read: **SUBMISSION_GUIDE.md** (what to show)
2. Read: **ARCHITECTURE.md** (design explanation)
3. Read: **uml-diagrams.md** (visual diagrams)
4. Prepare demo in QUICK_START guide
5. Practice presentation

### Path 4: Modifying/Extending? (custom)
1. Read: **README.md** (overview)
2. Study: **ARCHITECTURE.md** (system design)
3. Read relevant code files
4. Follow patterns established
5. Test changes

---

## 📁 Project Structure

```
GMinsta/                         ← Main project folder
│
├── 📄 README.md                 ← Start with this
├── 📄 QUICK_START.md            ← Quick setup
├── 📄 ARCHITECTURE.md           ← System design
├── 📄 FEATURES_GUIDE.md         ← Page details
├── 📄 SUBMISSION_GUIDE.md       ← For assignment
│
├── frontend/                    ← Browser files
│   ├── index.html               ← Main page (all 5 pages)
│   ├── css/
│   │   └── style.css            ← All styling (600+ lines)
│   └── js/
│       ├── app.js               ← Main logic
│       ├── auth.js              ← Login/Register
│       ├── feed.js              ← Posts system
│       └── chat.js              ← Messaging
│
├── backend/                     ← Server files
│   ├── server.js                ← Express entry point
│   ├── package.json             ← Dependencies
│   ├── .env                     ← Configuration (LOCAL)
│   ├── .env.example             ← Template (COMMIT THIS)
│   ├── config/
│   │   └── database.js          ← MySQL connection
│   ├── middleware/
│   │   └── auth.js              ← JWT verification
│   └── routes/
│       ├── auth.js              ← Auth endpoints
│       ├── posts.js             ← Post endpoints
│       ├── messages.js          ← Message endpoints
│       └── users.js             ← User endpoints
│
├── database/                    ← Data layer
│   └── schema.sql               ← MySQL schema (7 tables)
│
└── uml-diagrams/                ← Visual diagrams
    └── uml-diagrams.md          ← All UML diagrams
```

---

## 🔧 Setup by Component

### Part 1: Database (MySQL)
**File**: `database/schema.sql`
- Read: QUICK_START.md (Step 1)
- Execute SQL schema
- 7 tables created automatically

### Part 2: Backend (Node.js)
**Files**: `backend/server.js`, `backend/routes/*`
- Read: QUICK_START.md (Step 2)
- Install: `npm install`
- Start: `npm start`
- Tests: Try POST requests to `/api/auth/login`

### Part 3: Frontend (HTML/CSS/JS)
**Files**: `frontend/index.html`, `frontend/css/`, `frontend/js/`
- Read: QUICK_START.md (Step 3)
- Open: Backend must be running
- Option A: Live Server (VS Code)
- Option B: Python http.server

---

## 🎓 Learning Path

### Level 1: Basic Understanding (30 min)
- [ ] Read README.md
- [ ] Follow QUICK_START.md
- [ ] View project structure
- [ ] Understand what each folder does

### Level 2: System Design (1 hour)
- [ ] Read ARCHITECTURE.md
- [ ] View UML diagrams
- [ ] Understand database schema
- [ ] Learn API endpoints

### Level 3: Code Deep Dive (2+ hours)
- [ ] Study frontend code (app.js, auth.js, feed.js)
- [ ] Understand backend routes
- [ ] Learn how API calls work
- [ ] Follow authentication flow

### Level 4: Modification & Extension (varies)
- [ ] Identify code to change
- [ ] Follow existing patterns
- [ ] Test changes
- [ ] Deploy confidently

---

## 🎯 Common Tasks

### "How do I start the app?"
→ Read: **QUICK_START.md** (5 minutes)

### "How does feature X work?"
→ Read: **FEATURES_GUIDE.md** (find your feature)

### "I'm giving a presentation"
→ Read: **SUBMISSION_GUIDE.md** (presentation section)

### "I want to modify/add feature"
→ Read: **ARCHITECTURE.md** (understand system first)

### "Need to explain the database"
→ Read: **uml-diagrams.md** (ERD section)

### "What are the API endpoints?"
→ Read: **README.md** (API section)

### "How do I deploy?"
→ Read: **README.md** (deployment section)

### "What's the design system?"
→ Read: **FEATURES_GUIDE.md** (Design System section)

---

## ✨ Features at a Glance

| Feature | Status | Location |
|---------|--------|----------|
| User Registration | ✅ Complete | frontend/js/auth.js, backend/routes/auth.js |
| User Login | ✅ Complete | frontend/js/auth.js, backend/routes/auth.js |
| Create Posts | ✅ Complete | frontend/js/feed.js, backend/routes/posts.js |
| Upload Images | ✅ Complete | frontend/js/feed.js, backend/routes/posts.js |
| Like Posts | ✅ Complete | frontend/js/feed.js, backend/routes/posts.js |
| Comment | ✅ Complete | frontend/js/feed.js, backend/routes/posts.js |
| User Profile | ✅ Complete | frontend/js/feed.js, backend/routes/users.js |
| View Posts Grid | ✅ Complete | frontend/js/feed.js |
| User Stats | ✅ Complete | frontend/js/feed.js |
| Messaging | ✅ Complete | frontend/js/chat.js, backend/routes/messages.js |
| Search Users | ✅ Complete | frontend/js/chat.js |
| Session Persist | ✅ Complete | frontend/js/app.js |
| JWT Auth | ✅ Complete | backend/middleware/auth.js |
| Mobile Responsive | ✅ Complete | frontend/css/style.css |
| Error Handling | ✅ Complete | All files |

---

## 🔐 Security Features

✅ **Password Hashing**: bcryptjs with salt (10 rounds)
✅ **JWT Authentication**: Token-based, expires support (future)
✅ **Input Validation**: Frontend + backend
✅ **CORS Protection**: Configured for frontend
✅ **SQL Injection Prevention**: Parameterized queries
✅ **Protected Routes**: Middleware verification
✅ **Environment Variables**: Sensitive data not hardcoded
✅ **Error Messages**: Generic (no info leakage)

---

## 📊 Database Structure

### Users Table
Stores account information
```sql
id, username (UNIQUE), email (UNIQUE), password (hashed), 
avatar, bio, created_at, updated_at
```

### Posts Table
User-generated content
```sql
id, user_id (FK), image, caption, created_at, updated_at
```

### Comments Table
Interactions on posts
```sql
id, post_id (FK), user_id (FK), text, created_at
```

### Likes Table
Post appreciation
```sql
id, post_id (FK), user_id (FK), created_at
UNIQUE(post_id, user_id)  ← Prevents duplicate likes
```

### Messages Table
Direct messaging
```sql
id, sender_id (FK), receiver_id (FK), message, is_read, created_at
```

### Followers Table
Follow relationships
```sql
id, follower_id (FK), following_id (FK), created_at
UNIQUE(follower_id, following_id)  ← Prevents duplicate follows
```

---

## 🚨 Troubleshooting

### Issue: App won't start
**Solution**: See QUICK_START.md Troubleshooting section

### Issue: Can't connect to MySQL
**Solution**: Verify MySQL running, credentials correct in .env

### Issue: Frontend blank/shows errors
**Solution**: Check backend running, verify API_URL in app.js

### Issue: Images not uploading
**Solution**: Create `backend/uploads` folder, check permissions

### Issue: Can't login after registering
**Solution**: Check database has user table, no errors in console

### For more help
→ See QUICK_START.md or README.md Troubleshooting section

---

## 🎬 Viewing Rendered Diagrams

### Option 1: Markdown Viewer
Most GitHub markdown viewers automatically render Mermaid diagrams

### Option 2: Mermaid Live
Visit https://mermaid.live and paste content from uml-diagrams.md

### Option 3: VS Code
Install "Markdown Preview Mermaid Support" extension

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| HTML file | 1 (index.html) |
| CSS lines | 600+ |
| JavaScript files | 4 |
| JavaScript lines | 800+ |
| Backend routes | 4 files |
| Backend lines | 400+ |
| Database tables | 7 |
| Exported functions | 20+ |
| API endpoints | 12 |
| Documentation files | 6 |
| Total code | < 2000 lines |
| Total size | < 100 KB |

---

## 🎁 What Makes This Special

✨ **Clean Architecture**: 3-tier separation of concerns
✨ **Production-Ready**: Error handling, security, optimization
✨ **Well-Documented**: 6 comprehensive guides
✨ **Responsive Design**: Mobile-first, 3 breakpoints
✨ **Database Design**: Properly normalized, indexed
✨ **Modern UI**: Gradient palette, smooth animations
✨ **Easy to Learn**: Vanilla JS (no framework magic)
✨ **Easy to Extend**: Clear patterns to follow
✨ **Assignment-Ready**: Includes all documentation & UML
✨ **Lightweight**: ~100 KB total (excluding node_modules)

---

## 🎓 Assignment-Ready Features

These are perfect for your assignment:

1. **Authentication System**
   - Demonstrates: Security, hashing, JWT
   - File: backend/routes/auth.js

2. **Image Upload**
   - Demonstrates: File handling, Multer
   - File: backend/routes/posts.js

3. **Database Relationships**
   - Demonstrates: SQL design, foreign keys, normalization
   - File: database/schema.sql

4. **REST API**
   - Demonstrates: Proper HTTP methods, endpoints
   - Files: backend/routes/*

5. **Responsive Design**
   - Demonstrates: CSS media queries, mobile-first
   - File: frontend/css/style.css

6. **Form Validation**
   - Demonstrates: Input checking, error handling
   - Files: frontend/js/auth.js, backend/routes/*

7. **Session Management**
   - Demonstrates: localStorage, JWT, persistence
   - File: frontend/js/app.js

8. **UML Diagrams**
   - Demonstrates: System design thinking
   - File: uml-diagrams/uml-diagrams.md

---

## 🚀 Next Steps

1. **Open** the folder in VS Code
2. **Read** QUICK_START.md
3. **Follow** the 3-step setup
4. **Test** all features
5. **Present** with confidence!

---

## 📞 Support Resources

- **Setup issues**: QUICK_START.md → Troubleshooting
- **Feature questions**: FEATURES_GUIDE.md
- **Architecture questions**: ARCHITECTURE.md
- **API questions**: README.md → API Endpoints
- **Assignment help**: SUBMISSION_GUIDE.md

---

## ✅ Pre-Submission Checklist

- [ ] All files present (see project structure)
- [ ] Database schema loaded
- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can register new account
- [ ] Can login with account
- [ ] Can create post with image
- [ ] Can like/comment posts
- [ ] Can send messages
- [ ] Responsive design works
- [ ] No console errors
- [ ] All docs readable
- [ ] Presentation ready

---

## 🎉 You're All Set!

This is a complete, professional web application ready for:
- ✅ Class assignment
- ✅ Portfolio showcase
- ✅ Learning & experimentation
- ✅ Extension & modification

**Good luck with your assignment! 🚀**

For questions, start with the relevant guide file above.
