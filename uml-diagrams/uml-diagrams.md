<!-- GMinsta - UML Use Case Diagram -->
<!-- Open this file in a markdown viewer or use https://mermaid.live -->

# GMinsta - UML Diagrams

## Use Case Diagram

```mermaid
graph TB
    User((User))
    
    User -->|Login| Login[Login]
    User -->|Register| Register[Register]
    User -->|View Feed| Feed[View Feed]
    User -->|Create Post| CreatePost[Create Post]
    User -->|Like Post| Like[Like Post]
    User -->|Comment| Comment[Comment]
    User -->|View Profile| Profile[View Profile]
    User -->|Send Message| Chat[Send Message]
    User -->|Receive Message| ReceiveMsg[Receive Message]
    User -->|Follow User| Follow[Follow User]
    User -->|Unfollow User| Unfollow[Unfollow User]
    
    Admin((Admin))
    Admin -->|Moderate| Moderate[Moderate Content]
    Admin -->|Manage Users| ManageUsers[Manage Users]
    
    System[(Database)]
    Login -->|Store Session| System
    Register -->|Store User| System
    CreatePost -->|Store Post| System
    Comment -->|Store Comment| System
    Like -->|Store Like| System
    Chat -->|Store Message| System
    Follow -->|Store Follow| System
```

## Class Diagram

```mermaid
classDiagram
    class User {
        -int id
        -string username
        -string email
        -string password
        -string avatar
        -string bio
        -datetime created_at
        +register()
        +login()
        +updateProfile()
        +getProfile()
    }
    
    class Post {
        -int id
        -int user_id
        -string image
        -string caption
        -datetime created_at
        +createPost()
        +deletePost()
        +getPost()
        +updateCaption()
    }
    
    class Comment {
        -int id
        -int post_id
        -int user_id
        -string text
        -datetime created_at
        +addComment()
        +deleteComment()
    }
    
    class Like {
        -int id
        -int post_id
        -int user_id
        -datetime created_at
        +likePost()
        +unlikePost()
    }
    
    class Message {
        -int id
        -int sender_id
        -int receiver_id
        -string message
        -boolean is_read
        -datetime created_at
        +sendMessage()
        +markAsRead()
    }
    
    class Follower {
        -int id
        -int follower_id
        -int following_id
        -datetime created_at
        +followUser()
        +unfollowUser()
    }
    
    User "1" -->|creates| "many" Post
    User "1" -->|writes| "many" Comment
    User "1" -->|gives| "many" Like
    User "1" -->|sends/receives| "many" Message
    User "1" -->|follows| "many" Follower
    Post "1" -->|receives| "many" Comment
    Post "1" -->|receives| "many" Like
```

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ POSTS : creates
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ LIKES : gives
    USERS ||--o{ MESSAGES : sends
    USERS ||--o{ MESSAGES : receives
    USERS ||--o{ FOLLOWERS : haveFollowing
    USERS ||--o{ FOLLOWERS : haveFollowers
    POSTS ||--o{ COMMENTS : receives
    POSTS ||--o{ LIKES : receives
    
    USERS {
        int id PK
        string username UK
        string email UK
        string password
        string avatar
        string bio
        datetime created_at
        datetime updated_at
    }
    
    POSTS {
        int id PK
        int user_id FK
        string image
        string caption
        datetime created_at
        datetime updated_at
    }
    
    COMMENTS {
        int id PK
        int post_id FK
        int user_id FK
        string text
        datetime created_at
    }
    
    LIKES {
        int id PK
        int post_id FK
        int user_id FK
        datetime created_at
    }
    
    MESSAGES {
        int id PK
        int sender_id FK
        int receiver_id FK
        string message
        boolean is_read
        datetime created_at
    }
    
    FOLLOWERS {
        int id PK
        int follower_id FK
        int following_id FK
        datetime created_at
    }
```

## Sequence Diagram - User Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Enter email & password
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Query user by email
    Database-->>Backend: Return user data
    Backend->>Backend: Verify password
    Backend->>Backend: Generate JWT token
    Backend-->>Frontend: Return token & user info
    Frontend->>Frontend: Store token in localStorage
    Frontend->>User: Redirect to Feed Page
```

## Sequence Diagram - Create & View Post Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Select image & add caption
    Frontend->>Frontend: Preview image
    User->>Frontend: Click Post button
    Frontend->>Backend: POST /posts (FormData)
    Backend->>Backend: Save image to disk
    Backend->>Database: Insert post record
    Database-->>Backend: Confirm insertion
    Backend-->>Frontend: Post created successfully
    Frontend->>User: Show success toast
    Frontend->>Backend: GET /posts
    Backend->>Database: Fetch all posts with user info
    Database-->>Backend: Return posts array
    Backend-->>Frontend: Return posts JSON
    Frontend->>Frontend: Render posts in feed
    Frontend->>User: Display posts with images
```

## Activity Diagram - Post Like Flow

```mermaid
activity
    start
    :User views post;
    :Click like button;
    :Check if already liked;
    if (Already liked?) then
        :Unlike the post;
        :Delete from likes table;
    else
        :Like the post;
        :Insert into likes table;
    endif
    :Update like count;
    :Display in UI;
    stop
```
