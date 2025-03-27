import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHDAY } from '../queries'

const BirthdayForm = ({ allAuthors, setError }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [changeBirthday] = useMutation(UPDATE_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMessage =
        error.graphQLErrors[0]?.message || 'An error occurred'
      setError(errorMessage)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedOption) {
      setError('Please select an author')
      return
    }

    changeBirthday({
      variables: { name: selectedOption, born: parseInt(born) },
    })

    setSelectedOption(null)
    setBorn('')
  }

  return (
    <div>
      <h3>Change Birthday</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='author-select'>Author:</label>
          <select
            id='author-select'
            value={selectedOption || ''}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value='' disabled>
              Select an author
            </option>
            {allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='born-input'>Born:</label>
          <input
            id='born-input'
            type='number'
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type='submit'>Update Birthday</button>
      </form>
    </div>
  )
}

export default BirthdayForm
