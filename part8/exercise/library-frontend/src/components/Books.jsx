import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import BookCard from './BookCard'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const queryGenres = useQuery(ALL_GENRES)
  const queryBooks = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  if (!show) {
    return null
  }

  if (queryBooks.loading || queryGenres.loading) {
    return <div>loading...</div>
  }

  if (!queryBooks.data) {
    return <div>Books not found.</div>
  }

  const handleBooksByGenre = (genre) => {
    setSelectedGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        In genre <strong>{selectedGenre ? selectedGenre : 'All'}</strong>
      </p>
      <BookCard books={queryBooks.data.allBooks} />
      <div style={{ display: 'flex', gap: '5px', marginTop: '16px' }}>
        <button onClick={() => handleBooksByGenre('')}>All</button>
        {queryGenres.data.allGenres.length > 0 &&
          queryGenres.data.allGenres.map((genre) => (
            <button key={genre} onClick={() => handleBooksByGenre(genre)}>
              {genre}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books
