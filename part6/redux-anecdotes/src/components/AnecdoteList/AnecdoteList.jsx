/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { sumLike, viewData } from '../../reducers/anecdoteReducer'
import {
  showNotification,
  clearNotification,
} from '../../reducers/notificationReducer'
import serviceAnecdote from '../../services/anecdotes'
import './AnecdoteList.css'

const Anecdote = ({ anecdote, handleLike, handleViewData }) => {
  return (
    <div className='anecdote-container'>
      <div className='anecdote-content'>{anecdote.content}</div>
      <div className='anecdote-votes'>
        has <strong>{anecdote.votes}</strong> votes
      </div>
      <div className='anecdote-buttons'>
        <button
          className='anecdote-button anecdote-vote-button'
          onClick={handleLike}
        >
          vote
        </button>
        <button
          className='anecdote-button anecdote-view-button'
          onClick={handleViewData}
        >
          console data
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  // Redux Toolkit para devolver el estado inicial de las anécdotas, será inmutable, por lo que tendrás que copiarlo para ordenarlas
  const sortAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleLike = async (id) => {
    const anecdoteToChange = anecdotes.find((a) => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    }
    const updatedAnecdote = await serviceAnecdote.update(id, changedAnecdote)
    dispatch(sumLike(updatedAnecdote))
    dispatch(showNotification(`you voted: '${updatedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div className='anecdote-list-container'>
      {sortAnecdotes.length === 0 ? (
        <div className='anecdote-not-found'>Anecdote not found</div>
      ) : (
        sortAnecdotes.map((anecdote) => (
          <Anecdote
            anecdote={anecdote}
            key={anecdote.id}
            handleLike={() => handleLike(anecdote.id)}
            handleViewData={() => dispatch(viewData(anecdote.id))}
          />
        ))
      )}
    </div>
  )
}

export default AnecdoteList
