const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
  // check if there's `authorization` property in req.headers
  const { authorization: authHeader } = req.headers

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError('No authorized to access this route ', 401)
  }
}

module.exports = authenticationMiddleware
