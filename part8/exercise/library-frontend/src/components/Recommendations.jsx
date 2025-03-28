import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'
import BookCard from './BookCard'

const Recommendations = ({ show }) => {
  const [user, setUser] = useState([])
  const [books, setBooks] = useState([])
  const queryUser = useQuery(ME)
  const queryBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (queryUser.data) {
      setUser(queryUser.data.me)
    }
  }, [queryUser])

  useEffect(() => {
    if (queryBooks.data) {
      setBooks(queryBooks.data.allBooks)
    }
  }, [queryBooks])

  if (!show) {
    return null
  }

  if (user.favoriteGenre === '') {
    return <div>{user.username} do not have favorite genre.</div>
  }

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(user.favoriteGenre)
  )

  return (
    <>
      <h2>Recommendations</h2>
      {recommendedBooks.length > 0 ? (
        <p>
          books in your favorite genre <strong>{user.favoriteGenre}</strong>
        </p>
      ) : (
        <p>
          Not find recommended books for <strong>{user.favoriteGenre}</strong>{' '}
          genre
        </p>
      )}
      <BookCard books={recommendedBooks} />
    </>
  )
}

export default Recommendations
