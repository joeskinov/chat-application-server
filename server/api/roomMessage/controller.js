const success = require('../../services/response').success
const notFound = require('../../services/response').notFound
const authorOrAdmin = require('../../services/response').authorOrAdmin
const RoomMessage = require('./model').model

exports.create = ({ user, bodymen: { body } }, res, next) =>
  RoomMessage.create({ ...body, creator: user })
    .then((roomMessage) => roomMessage.view(true))
    .then(success(res, 201))
    .catch(next)

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
  RoomMessage.find(query, select, cursor)
    .populate('creator')
    .then((roomMessages) => roomMessages.map((roomMessage) => roomMessage.view()))
    .then(success(res))
    .catch(next)

exports.show = ({ params }, res, next) =>
  RoomMessage.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then((roomMessage) => roomMessage ? roomMessage.view() : null)
    .then(success(res))
    .catch(next)

exports.update = ({ user, bodymen: { body }, params }, res, next) =>
  RoomMessage.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((roomMessage) => roomMessage ? Object.assign(roomMessage, body).save() : null)
    .then((roomMessage) => roomMessage ? roomMessage.view(true) : null)
    .then(success(res))
    .catch(next)

exports.destroy = ({ user, params }, res, next) =>
  RoomMessage.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((roomMessage) => roomMessage ? roomMessage.remove() : null)
    .then(success(res, 204))
    .catch(next)
