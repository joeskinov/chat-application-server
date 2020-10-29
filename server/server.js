const http = require('http')
let env = require('./config').env
let mongo = require('./config').mongo
let port = require('./config').port
let ip = require('./config').ip
let apiRoot = require('./config').apiRoot
let api = require('./api').router

const mongoose = require('./services/mongoose').mongoose
const express = require('./services/express').express

const app = express(apiRoot, api)
const server = http.createServer(app)

const io = require('socket.io')(server)

const ClientManager = require('./services/socket.io').ClientManager
const ChatroomManager = require('./services/socket.io').ChatRoomManager
const makeHandlers = require('./services/socket.io').handlers

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', function (client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', client.id)
  clientManager.addClient(client)

  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', handleMessage)

  client.on('chatrooms', handleGetChatrooms)

  client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port)
  })
})
