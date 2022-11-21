const { UserModel } = require("./user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { username, password } = req.body
  const existedUser = await UserModel.findOne({ username })

  if (existedUser) throw new Error('Username existed')

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = await UserModel.create({
    username,
    password: hashPassword
  })

  const cloneUser = JSON.parse(JSON.stringify(newUser))

  res.send({
    success: 1,
    data: cloneUser
  })
}

const login = async (req, res) => {
  const { username, password } = req.body
  const existedUser = await UserModel.findOne({ username })

  if (!existedUser) throw new Error('Wrong username or password')

  const matched = await bcrypt.compare(password, existedUser.password)

  if (!matched) throw new Error('Wrong username or password')

  const userID = existedUser._id

  const access_token = jwt.sign({
    userID,
  }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24
  })

  res.send({
    success: 1,
    data: {
      _id: userID,
      access_token
    }
  })
}

const getUserData = async (req, res) => {
  const { user } = req
  const cloneUser = JSON.parse(JSON.stringify(user))
  res.send({
    success: 1,
    data: cloneUser
  })
}

module.exports = {
  register,
  login,
  getUserData
}