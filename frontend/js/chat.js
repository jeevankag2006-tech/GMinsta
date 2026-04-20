/* ============================================
   GMinsta - Chat Logic
   ============================================ */

let currentConversation = null;
let allUsers = [];

// Load chat page
async function loadChat() {
    try {
        const data = await apiCall('/users');
        allUsers = data;
        displayConversations(data);
    } catch (error) {
        console.error('Error loading chat:', error);
        showToast('Failed to load chats', 'error');
    }
}

// Display conversations
function displayConversations(users) {
    const conversationsList = document.getElementById('conversations-list');
    conversationsList.innerHTML = '';

    if (!users || users.length === 0) {
        conversationsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No users found</p>';
        return;
    }

    users.forEach(user => {
        if (user.id !== currentUser.id) {
            const convDiv = document.createElement('div');
            convDiv.className = 'conversation-item';
            convDiv.innerHTML = `
                <div class="conversation-user">${user.username}</div>
                <div class="conversation-preview">${user.last_message || 'Start a conversation'}</div>
            `;

            convDiv.addEventListener('click', () => {
                selectConversation(user);
            });

            conversationsList.appendChild(convDiv);
        }
    });
}

// Select conversation
async function selectConversation(user) {
    currentConversation = user;

    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.conversation-item').classList.add('active');

    // Update chat header
    document.getElementById('chat-user-name').textContent = user.username;

    // Load messages
    loadMessages(user.id);
}

// Load messages
async function loadMessages(userId) {
    try {
        const data = await apiCall(`/messages/${userId}`);
        displayMessages(data);
    } catch (error) {
        console.error('Error loading messages:', error);
        showToast('Failed to load messages', 'error');
    }
}

// Display messages
function displayMessages(messages) {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';

    if (!messages || messages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No messages yet. Start the conversation!</p>';
        return;
    }

    messages.forEach(message => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${message.sender_id === currentUser.id ? 'sent' : 'received'}`;
        msgDiv.innerHTML = `
            <div class="message-bubble">${message.message}</div>
        `;
        container.appendChild(msgDiv);
    });

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Handle send message
async function handleSendMessage(e) {
    e.preventDefault();

    if (!currentConversation) {
        showToast('Please select a user to message', 'error');
        return;
    }

    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) {
        return;
    }

    try {
        await apiCall(`/messages/${currentConversation.id}`, 'POST', { message });
        input.value = '';
        loadMessages(currentConversation.id);
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('Failed to send message', 'error');
    }
}

// Search users
function searchUsers() {
    const query = document.getElementById('search-users').value.toLowerCase();

    document.querySelectorAll('.conversation-item').forEach(item => {
        const username = item.querySelector('.conversation-user').textContent.toLowerCase();
        item.style.display = username.includes(query) ? 'block' : 'none';
    });
}