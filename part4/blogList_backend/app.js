const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./controllers/blog.controller')
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
