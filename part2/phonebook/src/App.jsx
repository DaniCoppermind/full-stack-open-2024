import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const personsData = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
]

const App = () => {
  const [persons, setPersons] = useState(personsData)
  const [newName, setNewName] = useState('') // input name form
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setsearchPerson] = useState('')

  const handleNameSubmit = (event) => {
    event.preventDefault()

    let isAdded = persons.some((person) => {
      return person.name === newName || person.number === newNumber
    })

    if (isAdded) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setsearchPerson(event.target.value)
  }

  const searchedPersons = persons.filter((person) => {
    const personText = person.name.toLowerCase()
    const searchText = searchPerson.toLowerCase()

    return personText.includes(searchText)
  })

  return (
    <>
      <h1>Phonebook</h1>

      <Filter search={searchPerson} handleChange={handleSearchChange} />

      <PersonForm
        handleSubmit={handleNameSubmit}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Persons searchedPersons={searchedPersons} />
    </>
  )
}

export default App
