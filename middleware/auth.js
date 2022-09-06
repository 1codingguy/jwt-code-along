const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
const { UnAuthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  // check if there's `authorization` property in req.headers
  const { authorization: authHeader } = req.headers

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('No authorized to access this route ' )
  }
}

module.exports = authenticationMiddleware
