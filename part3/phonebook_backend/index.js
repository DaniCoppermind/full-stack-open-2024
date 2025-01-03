require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phonebook = require('./models/phonebook')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.static('dist'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.json())

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const { name, number } = body

  if (!name || !number) {
    return res.status(400).json({
      error: 'Information Missing, please try again',
    })
  }

  const updatedPerson = {
    name: name,
    number: number,
  }

  Phonebook.findByIdAndUpdate(req.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((person) => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  const totalPersons = phonebook.length
  console.log(totalPersons)
  const dataTime = new Date()
  res.send(
    `<p>Phonebook has info for ${totalPersons} people</p> <p>${dataTime}</p>`
  )
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('server running')
})
