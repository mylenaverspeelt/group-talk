const socket = io()

const usersOnline = document.getElementById('online-users')
const messageContainer = document.getElementById('messages-list')
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
    
    
    if(messageInput.value == '') return 
    console.log(messageInput.value)

    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) => {
    addMessageToUI(false, data)
})


function addMessageToUI(isOwnMessage, data) {

    const element = `
<li class="${isOwnMessage ? "message-right" : "message-left"}">
<p class="message">
    ${data.message}
    <span class="message-status">${data.name} ⚪ ${moment(data.dateTime).fromNow()}</span>
</p>
</li>
`

    messageContainer.innerHTML += element
    scrollToBottom()
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}
