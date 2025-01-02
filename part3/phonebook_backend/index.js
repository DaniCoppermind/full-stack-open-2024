require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.static('dist'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.json())

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Information Missing, please try again',
    })
  }

  Phonebook.findOne({ name: body.name })
    .then((existingPerson) => {
      if (existingPerson) {
        return res.status(400).json({
          error: 'Name already exists in phonebook',
        })
      }

      const person = new Phonebook({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          res.json(savedPerson)
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to save person' })
        })
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to check existing person' })
    })
})

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((person) => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Phonebook.findById(req.params.id).then((person) => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter((p) => p.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  const totalPersons = phonebook.length
  console.log(totalPersons)
  const dataTime = new Date()
  res.send(
    `<p>Phonebook has info for ${totalPersons} people</p> <p>${dataTime}</p>`
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('server running')
})
