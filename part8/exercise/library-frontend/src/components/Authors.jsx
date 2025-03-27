import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { useState } from 'react'
import { useEffect } from 'react'
import BirthdayForm from './BirthdayForm'

const Authors = ({ show, setError }) => {
  const [authors, setAuthors] = useState([])
  const queryAuthors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (queryAuthors.data) {
      setAuthors(queryAuthors.data.allAuthors)
    }
  }, [queryAuthors])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthdayForm allAuthors={authors} setError={setError} />
    </div>
  )
}

export default Authors
