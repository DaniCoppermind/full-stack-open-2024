import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './app.css'

import personsServices from './services/persons'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // input name form
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setsearchPerson] = useState('')

  const [notification, setNotification] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    personsServices.getAll().then((dataPersons) => {
      setPersons(dataPersons)
    })
  }, [])

  const handleNameSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsServices
          .update(existingPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNotification(`Updated ${returnedPerson.name}`)
            setType('success')
            setTimeout(() => {
              setNotification(null)
              setType('')
            }, 5000)
          })
          .catch((error) => {
            setNotification(`Error updating ${existingPerson.name}`)
            setType('error')
            setTimeout(() => {
              setNotification(null)
              setType('')
            }, 5000)
          })
      }
    } else {
      personsServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setType('success')
          setTimeout(() => {
            setNotification(null)
            setType('')
          }, 5000)
        })
        .catch((error) => {
          setNotification(`Error adding ${personObject.name}`)
          setType('error')
          setTimeout(() => {
            setNotification(null)
            setType('')
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleButtonDelete = (event) => {
    const id = event.target.dataset.id
    const name = event.target.dataset.name

    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setNotification(`Deleted ${name}`)
          setType('success')
          setTimeout(() => {
            setNotification(null)
            setType('')
          }, 5000)
        })
        .catch((error) => {
          setNotification(`Error deleting ${name}`)
          setType('error')
          setTimeout(() => {
            setNotification(null)
            setType('')
          }, 5000)
        })
    }
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

  const searchedPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )

  return (
    <>
      <h1>Phonebook</h1>
      <Notifications notification={notification} type={type} />

      <Filter search={searchPerson} handleChange={handleSearchChange} />

      <PersonForm
        handleSubmit={handleNameSubmit}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Persons
        searchedPersons={searchedPersons}
        handleButtonDelete={handleButtonDelete}
      />
    </>
  )
}

export default App
