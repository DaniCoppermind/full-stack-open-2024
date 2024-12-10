import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
]

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Anecdotes = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote of the Day</h1>
      <blockquote>{anecdote}</blockquote>
      {votes === 0 ? (
        <p>Any vote</p>
      ) : (
        <p>
          has <b>{votes}</b> votes
        </p>
      )}
    </>
  )
}

const AnecdoteMostVoted = ({ anecdote, votes }) => {
  if (votes === 0) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>Ooops... we don't have votes</p>
      </>
    )
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <blockquote>{anecdote}</blockquote>
      <p>
        It's the most voted with: <b>{votes}</b> votes!
      </p>
    </>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleAnecdoteClick = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    if (randomIndex === selected) randomIndex++

    setSelected(randomIndex)
  }

  const handleVotesClick = () => {
    let newPoints = [...votes]
    newPoints[selected] += 1
    setVotes(newPoints)
  }

  const mostVoted = votes.indexOf(Math.max(...votes))
  return (
    <>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text={'vote!'} handleClick={handleVotesClick} />
      <Button text={'next anecdote'} handleClick={handleAnecdoteClick} />
      <AnecdoteMostVoted
        anecdote={anecdotes[mostVoted]}
        votes={votes[mostVoted]}
      />
    </>
  )
}

export default App
