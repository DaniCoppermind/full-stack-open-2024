const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.model')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' })
  }

  if (!username || username.length < 3) {
    return response
      .status(400)
      .json({ error: `${username} is shorter than the minimum allowed length` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
