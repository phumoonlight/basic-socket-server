import socketio from 'socket.io'

const useSocket = (server) => {
  const io = socketio(server)
  const socketStorage = {
    messages: [],
  }

  io.on('connect', (socket) => {
    console.log(`socket ${socket.id} has connected`)
    io.emit('broadcast', socketStorage.messages)

    socket.on('cc', (payload) => {
      const clonedPayload = payload
      clonedPayload.chatid = socketStorage.messages.length
      socketStorage.messages = [clonedPayload, ...socketStorage.messages]
      io.emit('broadcast', socketStorage.messages)
    })

    socket.on('disconnect', (reason) => {
      console.info(`socket ${socket.id} has disconnected`)
      console.info(`reason : ${reason}`)
    })
  })
}

export default useSocket
