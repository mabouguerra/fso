const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url:1, author:1, likes: 1 })

  response.status(200).json(users.map(u => u.toJSON()))
})

module.exports = userRouter