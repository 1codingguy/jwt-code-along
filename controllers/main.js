const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    // throw an error if either one invalide
    throw new CustomAPIError('username or password not valid', 400)
  }
  // create a json web token if both are valid
  // id normally provided by DB
  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_STRING, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res
    .status(200)
    .json({ msg: `Hello`, secret: `your lucky number is ${luckyNumber}` })
}

module.exports = {
  login,
  dashboard,
}
