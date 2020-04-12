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

const ioCache = {
  cc: [],
}

io.on('connect', (socket) => {
  console.log(`socket ${socket.id} has connected`)
  io.emit('test', 'hello')

  socket.on('cc', (data) => {
    data.chatid = ioCache.cc.length
    console.log(data)
    ioCache.cc = [
      ...ioCache.cc,
      data,
    ]
    console.log(ioCache)
    io.emit('broadcast', ioCache.cc)
  })

  socket.on('disconnect', (reason) => {
    console.info(`socket ${socket.id} has disconnected`)
    console.info(`reason : ${reason}`)
  })
})
