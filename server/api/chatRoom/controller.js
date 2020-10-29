const success = require('../../services/response').success
const notFound = require('../../services/response').notFound
const authorOrAdmin = require('../../services/response').authorOrAdmin
const ChatRoom = require('./model').model

exports.create = ({ user, bodymen: { body } }, res, next) =>
  ChatRoom.create({ ...body, creator: user })
    .then((chatRoom) => chatRoom.view(true))
    .then(success(res, 201))
    .catch(next)

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
  ChatRoom.find(query, select, cursor)
    .populate('creator')
    .populate('participants')
    .then((chatRooms) => chatRooms.map((chatRoom) => chatRoom.view()))
    .then(success(res))
    .catch(next)

exports.show = ({ params }, res, next) =>
  ChatRoom.findById(params.id)
    .populate('creator')
    .populate('participants')
    .then(notFound(res))
    .then((chatRoom) => chatRoom ? chatRoom.view() : null)
    .then(success(res))
    .catch(next)

exports.update = ({ user, bodymen: { body }, params }, res, next) =>
  ChatRoom.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((chatRoom) => chatRoom ? Object.assign(chatRoom, body).save() : null)
    .then((chatRoom) => chatRoom ? chatRoom.view(true) : null)
    .then(success(res))
    .catch(next)

exports.destroy = ({ user, params }, res, next) =>
  ChatRoom.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((chatRoom) => chatRoom ? chatRoom.remove() : null)
    .then(success(res, 204))
    .catch(next)
