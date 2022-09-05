const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  if (!username || !password) {
    console.log('username or password missing')
    throw new CustomAPIError('username or password not valid', 400)
  }
  res.send('fake Login/Register/Signup')
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
