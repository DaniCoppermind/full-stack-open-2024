import { useDispatch } from 'react-redux'
import { createAnecdote } from '../../reducers/anecdoteReducer'

import './AnecdoteForm.css'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div className='form-container'>
      <h2 className='form-heading'>Create New Anecdote</h2>
      <form onSubmit={addAnecdote} className='form-label'>
        <input
          name='anecdote'
          className='form-input'
          placeholder='Enter anecdote'
        />
        <button className='form-button'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
