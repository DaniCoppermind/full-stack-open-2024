import { useState } from 'react'

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
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{' '}
        <input value={searchPerson} onChange={handleSearchChange} />
      </div>
      <form onSubmit={handleNameSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchedPersons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        )
      })}
    </div>
  )
}

export default App
