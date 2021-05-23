require('dotenv').config()
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')



loginRouter.post('/', async(request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(400).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: body.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).json({ token, username: user.username, name: user.name })

})


module.exports = loginRouter