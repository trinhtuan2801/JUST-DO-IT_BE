const UserModel = require('../modules/auth/user')
const jwt = require('jsonwebtoken')

const needAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) throw new Error('Token not found')

    const jwtToken = token.split(' ')[1]

    const data = jwt.verify(jwtToken, process.env.SECRET_KEY)

    const { userID } = data

    if (!userID) throw new Error('User\'s ID not found')

    const existedUser = await UserModel.findById(userID)

    if (!existedUser) throw new Error('User not found')

    req.user = existedUser

    next()
}

module.exports = needAuthenticated