import { Server } from 'http'
import express from 'express'
import useSocket from './useSocket'

const PORT = process.env.PORT || 8080

const app = express()
const server = Server(app)
useSocket(server)

server.listen(PORT, () => {
  console.info(`ready on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json({
    serverStatus: 'online',
  })
})
