import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import FormPerson from './components/FormPerson'
import { Notify } from './components/Notify'
import FormPhone from './components/FormPhone'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <main>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <FormPerson setError={notify} />
      <FormPhone setError={notify} />
    </main>
  )
}

export default App
