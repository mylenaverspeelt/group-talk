const socket = io()

const usersOnline = document.getElementById('online-users')
const messageContainer = document.getElementById('message-list-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('online-users', (data) => {
    usersOnline.innerText = `Usuários online: ${data}`
})

function sendMessage() {
    console.log(messageInput.value)

    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
}

