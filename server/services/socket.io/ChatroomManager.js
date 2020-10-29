const Chatroom = require('./Chatroom')
/**
 * @TODO 
 * Fetch chatrooms and messages from databese 
 * then use these values in the websocket code below
 */
const chatroomTemplates = require('../../../config/chatrooms')

module.exports = function () {
  // mapping of all available chatrooms
  const chatrooms = new Map(
    chatroomTemplates.map(c => [
      c.name,
      Chatroom(c)
    ])
  )

  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client))
  }

  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName)
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  }
}
