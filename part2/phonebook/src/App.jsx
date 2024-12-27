import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import './app.css'

import personsServices from './services/persons'
import Notifications from './components/Notifications'

const BASE_URL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') // input name form
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setsearchPerson] = useState('')

  const [text, setText] = useState('')
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

    let isAdded = persons.some((person) => person.name === newName)

    if (isAdded) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToChange = persons.find((person) => person.name === newName)
        const changedPerson = { ...personToChange, number: newNumber }

        personsServices
          .update(personToChange.id, changedPerson)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToChange.id ? person : data
              )
            )
            setNewName('')
            setNewNumber('')
            setText(`Update ${personToChange.name} succesfully`)
            setType('success')
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setText(
                `The person ${personToChange.name} was already deleted from server`
              )
              setType('error')
              setPersons(persons.filter((p) => p.id !== personToChange, id))
            }
          })

        setTimeout(() => {
          setText('')
          setType('')
        }, 5000)
      }
      return
    }

    personsServices.create(personObject).then((data) => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
      setText(`Added ${newName} succesfully`)
      setType('success')
    })

    setTimeout(() => {
      setText('')
      setType('')
    }, 5000)
  }

  const handleButtonDelete = (event) => {
    const button = event.target
    const id = button.dataset.id
    const name = button.dataset.name

    if (window.confirm(`Delete ${name}?`)) {
      personsServices.deletePerson(id)
      setPersons(persons.filter((person) => person.id !== id))
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

  const searchedPersons = persons.filter((person) => {
    const personText = person.name
    const searchText = searchPerson

    console.log(personText, searchText)

    return personText.includes(searchText)
  })

  return (
    <>
      <h1>Phonebook</h1>
      <Notifications text={text} type={type} />

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
