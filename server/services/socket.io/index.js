const ChatRoom = require('./../../api/chatRoom/model').model
const RoomMessage = require('./../../api/roomMessage/model').model
exports.socket = (io) => {
  io.on('connection', async function (socket) {
  
    const chatrooms = await ChatRoom.find();

    chatrooms.forEach(chatroom => socket.join('chatroom:' + chatroom.id));
    // console.log('OK WE HERE _______-------------****************', socket.rooms);
  

  socket.on('message', async ({roomId, messageId}) => {
    const message = await RoomMessage.findById(messageId);
    console.log("Socket now in rooms", socket);
    console.log('chatroom:' + roomId);
    io.to('chatroom:' + roomId).emit('message-recieved', message);
  })
  
  // mark messages as seen
  socket.on('openchat', (roomId) => {

    RoomMessage.find({chatRoom: roomId, seen: false})
    .populate('creator')
    .then((messages) => messages.map((roomMessage) => {
      //io.to('chatroom:' + roomId).emit('chatroom updated', roomMessage);
      roomMessage ? Object.assign(roomMessage, {seen: true}).save() : null
    }))
    .then((messages) => io.to('chatroom:' + roomId).emit('marked as seen', messages.length))
    .catch(console.log('error'));

  });


    socket.on('disconnect', function () {
      console.log('socket disconnect...', socket.id)
    });
  
    socket.on('error', function (err) {
      console.log('received error from socket:', socket.id)
      console.log(err)
    });
  })
}
