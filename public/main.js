const socket = io()

const usersOnline = document.getElementById('online-users')

socket.on('online-users', (data) =>{
   usersOnline.innerText = `Usuários online: ${data}`
})