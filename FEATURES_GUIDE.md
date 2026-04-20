# 📖 GMinsta - Pages & Features Guide

## 🏠 Feed Page

**What it does**: Displays all posts from all users

**Components**:
- **Navbar** (top)
  - Logo: "📸 GMinsta"
  - Navigation: Feed | Create | Chat | Profile
  - Logout button
  
- **Post Card** (main area)
  - Post header: User avatar + username + time posted
  - Post image: Full-width, 400px height
  - Post caption: User's description
  - Actions: Like button (❤️) + Comment button (💬)
  - Like count: "42 likes"
  - Comments section: Shows existing comments
  - Comment input: Type comment and post

**Styling**:
- White cards on light gray background
- Smooth shadows on cards
- Gradient buttons (indigo to pink)
- Icons for interactions
- Responsive: Full-width on mobile

**Backend Calls**:
```
GET /api/posts
  ↓ Returns: Array of posts with user info
  
POST /api/posts/:id/like
  ↓ Toggles like, returns updated count
  
POST /api/posts/:id/comments
  ↓ Adds comment, returns comment ID
```

---

## ✍️ Create Post Page

**What it does**: Allows user to upload image and caption for new post

**Components**:
- **Image Upload Area**
  - Dashed border box
  - Click to select file from computer
  - Shows preview after selection
  - Accepts: `.jpg`, `.png`, `.gif`, `.webp`

- **Caption Input**
  - Textarea: Max 500 characters
  - Character counter: Shows "42/500"
  - Placeholder: "Share your moment..."

- **Post Button**
  - Gradient button
  - Submits FormData with image + caption
  - Shows success message
  - Redirects to feed

**Styling**:
- Card centered on page
- Clean, minimal form
- Large image upload area
- Real-time character count

**Backend Calls**:
```
POST /api/posts (multipart/form-data)
  - image: File object
  - caption: String
  ↓ Returns: Post ID
  ↓ Saves image to /uploads/TIMESTAMP.ext
```

---

## 👤 Profile Page

**What it does**: Shows user profile and their posts

**Components**:
- **Profile Header**
  - Avatar: 120x120px circular image
  - Username: Large heading
  - Email: Below username
  - Stats:
    - Posts count (number of posts)
    - Followers count
    - Following count

- **My Posts Section**
  - Grid layout: 3 columns on desktop, 1-2 on mobile
  - Post thumbnails: 200x200px
  - Shows like count on thumbnail
  - Hover effect: Scales up slightly

**Styling**:
- Header with white background
- Bordered avatar with gradient
- Stats in row format
- Grid for posts (responsive)

**Backend Calls**:
```
GET /api/users/:id
  ↓ Returns: User object with posts
  ↓ Fields: username, email, avatar, bio
  ↓ Includes: posts_count, followers_count, following_count
  ↓ Includes: Array of post objects
```

---

## 💬 Chat Page

**What it does**: One-to-one messaging between users

**Components**:
- **Left Sidebar**
  - Search box: Filter users by username
  - Conversations list: Shows all users
  - Each item shows:
    - Username
    - Last message preview
  - Active conversation highlighted

- **Main Chat Area**
  - Chat header: Shows current user name
  - Messages container:
    - Sent messages: Right aligned, gradient background
    - Received messages: Left aligned, white background
    - Each message in bubble
  - Message input:
    - Textarea for typing
    - Send button
    - Auto-clears on send

**Styling**:
- Two-column layout on desktop
- Messages in bubbles (left/right)
- Input at bottom
- Responsive: Stacked on mobile

**Backend Calls**:
```
GET /api/users
  ↓ Returns: Array of all users (except current)

GET /api/messages/:userId
  ↓ Returns: Array of messages with that user

POST /api/messages/:userId
  - message: String
  ↓ Inserts message record
  ↓ Refreshes message list
```

---

## 🔐 Login Page

**What it does**: Authenticates user with email & password

**Components**:
- **Auth Card** (centered)
  - Logo: "📸 GMinsta"
  - Heading: "Welcome Back"
  - Subtitle: "Sign in to your account"
  - Email input: Validates format
  - Password input: Hidden characters
  - Sign In button: Gradient
  - Register link: "Sign up here"

**Validation**:
- Email format checked
- Password required
- Error messages shown
- Success toast shown

**Styling**:
- Card on gradient background
- Rounded corners
- Shadow effect
- Clean form layout

**Backend Calls**:
```
POST /api/auth/login
  - email: String
  - password: String
  ↓ Returns: JWT token + user object
  ↓ Token stored in localStorage
  ↓ Redirects to feed
```

---

## 📝 Register Page

**What it does**: Creates new user account

**Components**:
- **Auth Card** (similar to login)
  - Heading: "Create Account"
  - Subtitle: "Join our community"
  - Username input: Min 3 chars
  - Email input: Valid format
  - Password input: Min 6 chars
  - Confirm password: Must match
  - Create Account button
  - Sign in link: "Already have account?"

**Validation**:
- Username: 3+ characters, no spaces
- Email: Valid format
- Password: 6+ characters
- Confirm: Must match
- Real-time feedback

**Styling**:
- Same as login page
- All 4 fields visible
- Clear error messages
- Success message on submit

**Backend Calls**:
```
POST /api/auth/register
  - username: String
  - email: String
  - password: String
  ↓ Returns: User ID
  ↓ Hashes password (bcryptjs)
  ↓ Stores in database
  ↓ Shows success message
```

---

## 🎨 Design System

### Colors Used
| Name | Hex | Use |
|------|-----|-----|
| Primary | #6366f1 | Buttons, links, accents |
| Secondary | #ec4899 | Highlights, likes |
| Background | #ffffff | Main background |
| Light BG | #f8fafc | Secondary background |
| Text Primary | #1e293b | Headers, main text |
| Text Secondary | #64748b | Descriptions, meta |
| Border | #e2e8f0 | Dividers, borders |

### Typography
- **Poppins**: Bold titles, headers
- **Inter**: Body text, descriptions
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### Shadows
- Small: 0 1px 2px rgba(0, 0, 0, 0.05)
- Medium: 0 4px 6px rgba(0, 0, 0, 0.1)
- Large: 0 10px 25px rgba(0, 0, 0, 0.1)

### Border Radius
- Small buttons: 0.5rem (8px)
- Cards: 1rem (16px)
- Auth cards: 1.5rem (24px)
- Avatars: 50% (circle)

---

## 🖱️ User Interactions

### Like Button Interaction
1. User hovers over button → Color lightens
2. User clicks → Toggles between liked/unliked
3. Heart icon changes: 🤍 → ❤️
4. Like count updates immediately
5. No page reload needed
6. Animation: Smooth color transition

### Comment Submission
1. User types in comment box
2. User clicks "Post" button
3. Comment added to list above
4. Input clears
5. Success message shows
6. Count updates

### Image Upload
1. User clicks dashed box
2. Browser file dialog opens
3. User selects image
4. Preview shows in box
5. Can click again to replace
6. Drag & drop also works (future)

### Navigation
1. User clicks navbar link
2. Page content changes (no reload)
3. Active link highlighted
4. Smooth fade animation
5. Content loads from API

---

## 📱 Responsive Behavior

### Desktop (1200px+)
- 2-column chat layout
- 3-column post grid
- Full navbar visible
- Cards full width with max constraint

### Tablet (768px - 1200px)
- Single column for chat
- 2-column post grid
- Navbar wraps items
- Smaller spacing

### Mobile (< 768px)
- All single column
- Stacked chat layout
- 1 column post grid
- Navbar vertical
- Smaller fonts
- Reduced spacing
- Touch-friendly buttons (48px+)

---

## 🚀 User Flow Summary

**New User**:
Register → Login → See feed → Create post → Like/comment → Chat → Profile

**Existing User**:
Login → Feed (see posts) → Create → Profile → Chat → Logout

**Typical Session**:
1. Open app
2. Log in (credentials saved in localStorage)
3. View feed (auto-loaded)
4. Like/comment on posts
5. Maybe: Create own post
6. Check messages
7. View profile
8. Logout

---

## ✨ Interactive Features

- **Smooth Animations**: Page transitions fade in
- **Hover Effects**: Buttons lift on hover
- **Like Animation**: Heart changes with smooth color transition
- **Loading State**: Shows spinner while loading
- **Error Messages**: Toast notifications for errors/success
- **Real-time Updates**: Counts update without reload
- **Form Validation**: Shows errors before submit
- **Character Counter**: Live character count on caption
- **Search**: Filters conversation list instantly

Perfect for your assignment presentation! 🎓
