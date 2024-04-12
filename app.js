const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log(` chat server on port ${PORT}`)
})

const io = require('socket.io')(server)

//permite que o servidor acesse a pasta de recursos estaticos que esta no mesmo diretorio que ele
app.use(express.static(path.join(__dirname, 'public')))

let socketConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit('online-users', socketConnected.size)

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
        socketConnected.delete(socket.id)

        io.emit('online-users', socketConnected.size)

    })

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })
}

