import { Server } from 'http'
import express from 'express'
import socketio from 'socket.io'

const PORT = process.env.PORT || 8080

const app = express()
const server = Server(app)
const io = socketio(server)

server.listen(PORT, () => {
  console.info(`ready on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json({
    serverStatus: 'online',
  })
})

const ioCache = {
  messages: [],
}

io.on('connect', (socket) => {
  console.log(`socket ${socket.id} has connected`)
  io.emit('broadcast', ioCache.messages)

  socket.on('cc', (payload) => {
    const cloned = payload
    cloned.chatid = ioCache.messages.length
    ioCache.messages = [cloned, ...ioCache.messages]
    io.emit('broadcast', ioCache.messages)
  })

  socket.on('disconnect', (reason) => {
    console.info(`socket ${socket.id} has disconnected`)
    console.info(`reason : ${reason}`)
  })
})
