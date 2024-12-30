const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(express.json())

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString(16)
}

app.use(express.json())

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Information Missing, please try again',
    })
  }

  const nameExists = phonebook.some((p) => p.name === body.name)

  if (nameExists) {
    return res.status(400).json({
      error: 'Name already exists in phonebook',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phonebook = phonebook.concat(person)

  res.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
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

const PORT = 3000
app.listen(PORT, () => {})
