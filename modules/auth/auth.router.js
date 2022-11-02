const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')
const needAuthenticated = require('../../middlewares/needAuthenticated')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/user', needAuthenticated, authController.getUserData)
module.exports = router