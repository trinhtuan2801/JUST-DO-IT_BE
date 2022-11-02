require('dotenv').config()
require('express-async-errors')
const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./modules/auth/auth.router')
const todoRouter = require('./modules/todo/todo.router')
mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) {
    return console.log('error connect mongodb', err)
  }
  console.log('Connect DB successfully')
})

const app = express()

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static('public'))
app.use(express.json())
app.use(cors())
/////////////////////////////////////////////////

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/register.html'))
// })

app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)

/////////////////////////////////////////////////

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log('Error start app', err)
  }
  console.log(`Server started successfully at ${process.env.PORT || 8080}`)
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.send({ success: 0, message: err.message })
})

app.use('*', (req, res) => {
  res.send({ success: 0, message: '404 not found' })
})