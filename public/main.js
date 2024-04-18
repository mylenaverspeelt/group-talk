const socket = io()

const usersOnline = document.getElementById('online-users')
const messageContainer = document.getElementById('messages-list')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageTone = new Audio('./resources/message-tone.mp3')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('online-users', (data) => {
    usersOnline.innerText = `Usuários online: ${data}`
})

function sendMessage() {

    if (messageInput.value == '') return

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
    messageTone.play()
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
    clearFeedbackMessages()
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

messageInput.addEventListener('focus', () => {
    socket.emit('feedback', {
        feedback: `✍️  ${nameInput.value} esta digitando...`
    })
})

messageInput.addEventListener('keypress', () => {
    socket.emit('feedback', {
        feedback: `✍️ ${nameInput.value} esta digitando...`
    })
})

messageInput.addEventListener('blur', () => {
    socket.emit('feedback', {
        feedback: ''
    })
})

socket.on('feedback', (data) => {

    clearFeedbackMessages()

    const element = `   <li class="message-feedback">
    <p class="feedback" id="feedback">
       ${data.feedback}
    </p>
</li>`

    messageContainer.innerHTML += element
})

function clearFeedbackMessages() {
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element)
    })
}
