/* ============================================
   GMinsta - Authentication Logic
   ============================================ */

// Handle login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Validation
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showToast('Invalid email format', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(data.message || 'Login failed', 'error');
            return;
        }

        // Store user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        currentUser = data.user;

        showToast('Login successful!');
        showPage('feed-page');
        loadFeed();
    } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred during login', 'error');
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showToast('Invalid email format', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (username.length < 3) {
        showToast('Username must be at least 3 characters', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(data.message || 'Registration failed', 'error');
            return;
        }

        showToast('Account created! Please login.');
        document.getElementById('register-form').reset();

        // Switch to login page
        showPage('login-page');
    } catch (error) {
        console.error('Registration error:', error);
        showToast('An error occurred during registration', 'error');
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}