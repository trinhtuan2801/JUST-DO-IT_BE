const TodoModel = require('./todo')
const jwt = require('jsonwebtoken')
const UserModel = require('../auth/user')

const getTodos = async (req, res) => {
  const { user, query } = req
  const { status } = query
  const todos = await TodoModel.find({ userID: user._id })
  const clone_todos = JSON.parse(JSON.stringify(todos))
  res.send({ success: 1, data: clone_todos })
}

const createTodo = async (req, res) => {
  const { user } = req
  const { content, status } = req.body
  const newTodo = await TodoModel.create({
    userID: user._id,
    content,
    status,
  })
  const clone_newTodos = JSON.parse(JSON.stringify(newTodo))
  res.send({ success: 1, data: clone_newTodos })
}

const updateTodo = async (req, res) => {
  const { user } = req
  const { todoID } = req.params

  const foundTodo = await TodoModel.findById(todoID)
  if (foundTodo.userID.toString() !== user._id.toString()) throw new Error('Not your todo')

  const updateData = req.body

  const updatedTodo = await TodoModel.findByIdAndUpdate(todoID, updateData, { new: true })

  res.send({ success: 1, data: updatedTodo })
}

const deleteTodo = async (req, res) => {
  const { user } = req
  const { todoID } = req.params

  const foundTodo = await TodoModel.findById(todoID)
  if (foundTodo.userID.toString() !== user._id.toString()) throw new Error('Not your todo')

  const deletedTodo = await TodoModel.findByIdAndDelete(todoID)

  res.send({ success: 1, data: deletedTodo })
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}