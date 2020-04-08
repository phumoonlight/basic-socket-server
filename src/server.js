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
    message: 'OK',
  })
})

io.on('connect', (socket) => {
  console.log('user connected', socket.id)
  io.emit('test', 'hello')

  socket.on('cc', (data) => {
    console.log(data)
    socket.broadcast.emit('broadcast', data)
  })
})
