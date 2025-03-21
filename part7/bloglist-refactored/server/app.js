const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const blogRouter = require('./controllers/blog.controller')
const usersRouter = require('./controllers/user.controller')
const loginRouter = require('./controllers/login.controller')

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogRouter
)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
