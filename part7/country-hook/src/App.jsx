import React, { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, loading, error } = useCountry(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {country && <Country country={country} />}
    </div>
  )
}

export default App
