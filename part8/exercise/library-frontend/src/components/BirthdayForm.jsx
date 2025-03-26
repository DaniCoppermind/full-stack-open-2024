import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHDAY } from '../queries'

const BirthdayForm = ({ setError, authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [changeBirthday, result] = useMutation(UPDATE_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    changeBirthday({
      variables: { name, born: Number(born) },
    })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          >
            {authors &&
              authors.map((author) => (
                <option value={author.name} key={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change birthday</button>
      </form>
    </div>
  )
}

export default BirthdayForm
