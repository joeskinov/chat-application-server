const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const jwtSecret = require('../../config').jwtSecret

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

exports.sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options)

exports.signSync = (id, options) => sign(id, options, jwt.sign)

exports.verify = (token) => jwtVerify(token, jwtSecret)

