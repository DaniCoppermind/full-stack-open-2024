const Anecdote = ({ anecdote, handleLike }) => {
  return (
    <div>
      <h2>{anecdote.author}</h2>
      <p>{anecdote.content}</p>
      <span>
        {anecdote.votes} votes{' '}
        <button onClick={() => handleLike(anecdote.id)}>Vote</button>
      </span>
    </div>
  )
}

export default Anecdote
