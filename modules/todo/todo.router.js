const express = require('express')
const router = express.Router()
const todoController = require('./todo.controller')
const needAuthenticated = require('../../middlewares/needAuthenticated')

router.get('/', needAuthenticated, todoController.getTodos)
router.post('/', needAuthenticated, todoController.createTodo)
router.patch('/:todoID', needAuthenticated, todoController.updateTodo)
router.delete('/:todoID', needAuthenticated, todoController.deleteTodo)

module.exports = router