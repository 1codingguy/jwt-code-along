const login = async (req, res) => {
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
