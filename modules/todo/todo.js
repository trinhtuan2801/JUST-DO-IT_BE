const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['TODO', 'PROGRESS', 'DONE'],
    default: 'TODO',
    required: true
  },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = {
  TodoModel,
  TodoSchema
}