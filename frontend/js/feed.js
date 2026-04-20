/* ============================================
   GMinsta - Feed & Posts Logic
   ============================================ */

let selectedImage = null;
let profileListData = {
    followers: [],
    following: []
};

// Load feed posts
async function loadFeed() {
    try {
        const data = await apiCall('/posts');
        displayPosts(data);
    } catch (error) {
        console.error('Error loading feed:', error);
        showToast('Failed to load feed', 'error');
    }
}

// Display posts
function displayPosts(posts) {
    const feedContainer = document.getElementById('posts-feed');
    feedContainer.innerHTML = '';

    if (!posts || posts.length === 0) {
        feedContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posts yet. Be the first to share!</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
}

// Create post element
function createPostElement(post) {
    const imageUrl = post.image && !post.image.startsWith('http') ?
        `${API_URL.replace('/api', '')}${post.image}` :
        post.image || 'https://via.placeholder.com/600x400';

    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <div class="post-header">
            <img src="${post.user.avatar || 'https://via.placeholder.com/50'}" alt="${post.user.username}" class="post-avatar">
            <div class="post-user-info">
                <div class="post-username">${post.user.username}</div>
                <div class="post-time">${formatTime(post.created_at)}</div>
            </div>
        </div>
        
        <img src="${imageUrl}" alt="Post" class="post-image" style="width: 100%; height: 400px; object-fit: cover;">
        
        <div class="post-content">
            <div class="post-caption">${post.caption}</div>
            
            <div class="post-actions">
                <button class="action-btn like-btn ${post.isLiked ? 'liked' : ''}" data-post-id="${post.id}">
                    <span>${post.isLiked ? '❤️' : '🤍'}</span>
                    <span class="likes-count">${post.likes_count}</span>
                </button>
                <button class="action-btn comment-btn" data-post-id="${post.id}">
                    <span>💬</span>
                    <span>${post.comments_count || 0}</span>
                </button>
            </div>
            
            ${post.comments && post.comments.length > 0 ? `
                <div class="comments-section">
                    <h4>Comments</h4>
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <div class="comment-author">${comment.user.username}</div>
                            <div class="comment-text">${comment.text}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="comment-form">
                <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    class="comment-input" 
                    data-post-id="${post.id}"
                >
                <button class="btn btn-primary btn-small" onclick="submitComment(${post.id})">Post</button>
            </div>
        </div>
    `;

    // Add event listeners
    div.querySelector('.like-btn').addEventListener('click', (e) => {
        e.preventDefault();
        handleLike(post.id, div.querySelector('.like-btn'));
    });

    return div;
}

// Handle like button
async function handleLike(postId, button) {
    try {
        const response = await apiCall(`/posts/${postId}/like`, 'POST');
        
        const isLiked = button.classList.contains('liked');
        button.classList.toggle('liked');
        
        const heart = button.querySelector('span:first-child');
        heart.textContent = isLiked ? '🤍' : '❤️';
        
        const count = button.querySelector('.likes-count');
        count.textContent = response.likes_count;
    } catch (error) {
        console.error('Error liking post:', error);
        showToast('Failed to like post', 'error');
    }
}

// Submit comment
async function submitComment(postId) {
    const input = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
    const text = input.value.trim();

    if (!text) {
        showToast('Please enter a comment', 'error');
        return;
    }

    try {
        await apiCall(`/posts/${postId}/comments`, 'POST', { text });
        input.value = '';
        loadFeed();
        showToast('Comment added!');
    } catch (error) {
        console.error('Error posting comment:', error);
        showToast('Failed to post comment', 'error');
    }
}

// Preview image when selected
function previewImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();
    reader.onload = (event) => {
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

// Handle create post
async function handleCreatePost(e) {
    e.preventDefault();

    if (!selectedImage) {
        showToast('Please select an image', 'error');
        return;
    }

    const caption = document.getElementById('post-caption').value.trim();

    if (!caption) {
        showToast('Please add a caption', 'error');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('caption', caption);

        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        showToast('Post created successfully!');
        document.getElementById('create-post-form').reset();
        document.getElementById('image-preview').innerHTML = '<p>Click to upload or drag and drop</p>';
        selectedImage = null;

        // Go back to feed
        showPage('feed-page');
        loadFeed();
    } catch (error) {
        console.error('Error creating post:', error);
        showToast('Failed to create post', 'error');
    }
}

// Load user profile
async function loadProfile() {
    try {
        const data = await apiCall(`/users/${currentUser.id}`);
        displayProfile(data);
    } catch (error) {
        console.error('Error loading profile:', error);
        showToast('Failed to load profile', 'error');
    }
}

// Display profile
function displayProfile(user) {
    const isSampleProfile = user.username === 'testuser';
    const displayName = isSampleProfile ? 'Jeevan V' : user.username;
    const followersCount = isSampleProfile ? 900 : user.followers_count || 0;
    const followingCount = isSampleProfile ? 50 : user.following_count || 0;
    const followers = user.followers || [];

    document.getElementById('profile-username').textContent = displayName;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-pic').src = user.avatar || 'https://via.placeholder.com/120';
    document.getElementById('post-count').textContent = user.posts_count || 0;
    document.getElementById('followers-count').textContent = followersCount;
    document.getElementById('following-count').textContent = followingCount;

    profileListData.followers = (followers || []).length > 0 ? followers.map(f => f.username) : ['santhung', 'arjun', 'maya', 'rhea', 'sonam', 'vikram', 'neha', 'anil', 'meera', 'pawan'];
    profileListData.following = (following || []).length > 0 ? following.map(f => f.username) : ['friend1', 'friend2', 'friend3', 'friend4', 'friend5'];

    const followersList = document.getElementById('followers-list');
    followersList.innerHTML = '';
    profileListData.followers.slice(0, 6).forEach(name => {
        const chip = document.createElement('div');
        chip.className = 'follower-chip';
        chip.textContent = name;
        followersList.appendChild(chip);
    });

    // Display user posts
    const postsContainer = document.getElementById('user-posts');
    postsContainer.innerHTML = '';

    if (user.posts && user.posts.length > 0) {
        user.posts.forEach(post => {
            const imageUrl = post.image && !post.image.startsWith('http')
                ? `${API_URL.replace('/api', '')}${post.image}`
                : post.image || 'https://via.placeholder.com/600x400';

            const postDiv = document.createElement('div');
            postDiv.className = 'post-card';
            postDiv.style.cursor = 'pointer';
            postDiv.innerHTML = `
                <img src="${imageUrl}" alt="Post" class="post-image" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 0.5rem; text-align: center; font-size: 0.9rem;">
                    ❤️ ${post.likes_count || 0}
                </div>
            `;
            postsContainer.appendChild(postDiv);
        });
    } else {
        postsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No posts yet</p>';
    }
}

function handleProfileAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    fetch(`${API_URL}/users/avatar`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    })
    .then(async response => {
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to upload avatar');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('profile-pic').src = `${API_URL.replace('/api', '')}${data.avatar}`;
        showToast('Profile photo updated successfully!');
    })
    .catch(error => {
        console.error('Avatar upload error:', error);
        showToast('Failed to upload profile photo', 'error');
    });
}

function showProfileList(type) {
    const title = document.getElementById('modal-title');
    const modalList = document.getElementById('modal-list');
    const modal = document.getElementById('profile-modal');

    const items = type === 'Followers' ? profileListData.followers : profileListData.following;
    title.textContent = type;
    modalList.innerHTML = items.length === 0 ? '<div class="modal-item">No users found</div>' : items.map(name => `<div class="modal-item">${name}</div>`).join('');
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.classList.add('hidden');
}