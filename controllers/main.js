const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    // throw an error if either one invalid
    throw new CustomAPIError('username or password not valid', 400)
  }
  // create a json web token if both are valid
  // id normally provided by DB
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_STRING, {
    expiresIn: '30d',
  })
  // token gets stored in Browser's local storage in this example
  // but normally shouldn't do this?
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

  const { authorization: authHeader } = req.headers

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING)

    const luckyNumber = Math.floor(Math.random() * 100)
    res
      .status(200)
      .json({
        msg: `Hello ${decoded.username}`,
        secret: `your lucky number is ${luckyNumber}`,
      })
  } catch (error) {
    throw new CustomAPIError('No authorized to access this route ', 401)
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }
}

module.exports = {
  login,
  dashboard,
}
