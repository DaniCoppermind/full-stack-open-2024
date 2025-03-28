import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookCard from './BookCard'

const Books = ({ show }) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])
  const queryBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (queryBooks.data) {
      setBooks(queryBooks.data.allBooks)
      setFilteredBooks(queryBooks.data.allBooks)
    }
  }, [queryBooks])

  if (!show) {
    return null
  }

  // Utilizamos flatMap para obtener una lista única de géneros
  const uniqueGenres = [...new Set(books.flatMap((book) => book.genres))]

  const filteredBooksByGenre = (selectedGenre) => {
    setGenre(selectedGenre)
    if (selectedGenre === 'ALL') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((book) => book.genres.includes(selectedGenre))
      )
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre || 'All'}</strong>
      </p>
      <BookCard books={filteredBooks} />
      <div style={{ display: 'flex', gap: '5px', marginTop: '16px' }}>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => filteredBooksByGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => filteredBooksByGenre('ALL')}>All</button>
      </div>
    </div>
  )
}

export default Books
