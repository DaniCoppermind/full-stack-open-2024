import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'

import Persons from './components/Persons'
import FormPerson from './components/FormPerson'
import { Notify } from './components/Notify'
import FormPhone from './components/FormPhone'

const App = () => {
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
