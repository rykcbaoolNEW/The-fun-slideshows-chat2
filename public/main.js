const socket = io();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');

function addMessage(username, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="username">${username}: </span>${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        const data = { username: localStorage.getItem('username'), message };
        addMessage(data.username, data.message);
        socket.emit('message', data);
        messageInput.value = '';
    }
}

socket.on('message', (data) => {
    addMessage(data.username, data.message);
});
