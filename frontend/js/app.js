/* ============================================
   GMinsta - Main App Logic
   ============================================ */

const API_URL = 'http://localhost:5000/api';
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
    setupNavigation();
    setupPageListeners();
});

// Check if user is logged in
function checkUserSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        currentUser = JSON.parse(user);
        showPage('feed-page');
    } else {
        showPage('login-page');
    }
}

// Setup page navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item, .link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            navigateToPage(target);
        });
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

// Navigate to page
function navigateToPage(target) {
    const hash = target.substring(1);
    const pageMap = {
        'login': 'login-page',
        'register': 'register-page',
        'feed': 'feed-page',
        'create': 'create-page',
        'profile': 'profile-page',
        'chat': 'chat-page'
    };

    const pageId = pageMap[hash];
    if (pageId) {
        showPage(pageId);
        if (pageId === 'feed-page') {
            loadFeed();
        } else if (pageId === 'profile-page') {
            loadProfile();
        } else if (pageId === 'chat-page') {
            loadChat();
        }
    }
}

// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Setup page-specific listeners
function setupPageListeners() {
    // Login form
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    // Create post form
    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) createPostForm.addEventListener('submit', handleCreatePost);

    // Image upload preview
    const imageInput = document.getElementById('post-image');
    if (imageInput) {
        imageInput.addEventListener('change', previewImage);
        const imagePreview = document.querySelector('.image-preview');
        if (imagePreview) {
            imagePreview.addEventListener('click', () => {
                imageInput.click();
            });
        }
    }

    // Caption character count
    const postCaption = document.getElementById('post-caption');
    if (postCaption) {
        postCaption.addEventListener('input', (e) => {
            document.getElementById('char-count').textContent = e.target.value.length;
        });
    }

    // Search users in chat
    const searchUsersInput = document.getElementById('search-users');
    if (searchUsersInput) searchUsersInput.addEventListener('input', searchUsers);

    // Message form
    const messageForm = document.getElementById('message-form');
    if (messageForm) messageForm.addEventListener('submit', handleSendMessage);

    const profileAvatarInput = document.getElementById('profile-avatar-input');
    if (profileAvatarInput) profileAvatarInput.addEventListener('change', handleProfileAvatarChange);

    const followersWrapper = document.getElementById('followers-count-wrapper');
    if (followersWrapper) followersWrapper.addEventListener('click', () => showProfileList('Followers'));

    const followingWrapper = document.getElementById('following-count-wrapper');
    if (followingWrapper) followingWrapper.addEventListener('click', () => showProfileList('Following'));

    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format time
function formatTime(date) {
    const now = new Date();
    const diff = now - new Date(date);

    if (diff < 60000) return 'just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';

    return new Date(date).toLocaleDateString();
}

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);

        const responseBody = await response.json().catch(() => null);

        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const message = responseBody ? .message || response.statusText || 'Unknown error';
            console.error('API Call Error:', response.status, message, responseBody);
            throw new Error(message);
        }

        return responseBody;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    showPage('login-page');
    showToast('Logged out successfully');
}