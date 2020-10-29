const errMessagePrefixCode = {
  "delivery": '30'
}
const errStatusSuffix = {
  400: 0, 
  500: 1,
  401: 2,
}
exports.success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

exports.notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

exports.authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
exports.serverError = (res, options) => error => {
  const { apiRootName, status, ctxMessage } = options
  const prefix = errMessagePrefixCode[apiRootName]
  if (error) {
    let errorMessage, status
    if (error.message) {
      status = 400
      errorMessage = `CODE${prefix + errStatusSuffix[status]}:Make sure all required fields have been correctly entered.\n` +
                      `ERROR: ${error.message}`
    } else {
      status = 500
      errorMessage = `CODE${prefix + errStatusSuffix[status]}:An err occurred, please try again.\n` +
                      `ERROR: ${error}` 
    }
    return res.status(status).send(errorMessage)    
  } else {
    let errorMessage = `CODE${prefix + errStatusSuffix[status]}:` + `ERROR: ${ctxMessage}`
    return res.status(status).send(errorMessage)  
  }
}
