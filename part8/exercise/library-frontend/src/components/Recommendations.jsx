import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookCard from './BookCard'

const Recommendations = ({ show, favoriteGenre }) => {
  const { loading, data } = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Failed yo load recommendations.</div>
  }

  if (favoriteGenre === '') {
    return <div>You don't have any favorite genre.</div>
  }

  return (
    <>
      <h2>Recommendations</h2>
      {data.allBooks.length === 0 && (
        <p>
          No books in your favorite genre <strong>{favoriteGenre}</strong>
        </p>
      )}
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BookCard books={data.allBooks} />
    </>
  )
}

export default Recommendations
