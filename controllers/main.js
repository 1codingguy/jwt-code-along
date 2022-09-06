const CustomAPIError = require('../errors/custom-error')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    // throw an error if either one invalid
    throw new BadRequestError('username or password not valid')
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
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
