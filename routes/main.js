const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authenticationMiddleware = require('../middleware/auth')

// chain authenticationMiddleware and dashboard controller function
router.route('/dashboard').get(authenticationMiddleware, dashboard)
router.route('/login').post(login)

module.exports = router
