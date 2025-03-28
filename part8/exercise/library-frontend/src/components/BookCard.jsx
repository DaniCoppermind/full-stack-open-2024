import React from 'react'

const BookCard = ({ books }) => {
  if (!books) {
    return <p>No Books</p>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Author</th>
          <th>Published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookCard
