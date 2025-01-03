const phonebookRouter = require('express').Router()
const Phonebook = require('../models/phonebook')

phonebookRouter.get('/', (request, response) => {
  Phonebook.find({}).then((person) => {
    response.json(person)
  })
})

phonebookRouter.get('/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch((error) => next(error))
})

phonebookRouter.post('/', (request, response, next) => {
  const body = request.body

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

phonebookRouter.put('/:id', (request, response, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Information undefined, please try again',
    })
  }

  const updatedPerson = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

phonebookRouter.delete('/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = phonebookRouter
