import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useContext } from 'react'
import AnecdoteContext from '../context/AnecdoteContext'
import { showNotificationWithTimeout } from '../utils/notificationUtils'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(AnecdoteContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotificationWithTimeout(
        notificationDispatch,
        `Anecdote '${newAnecdote.content}' added`
      )
    },
    onError: (error) => {
      showNotificationWithTimeout(
        notificationDispatch,
        `Error: ${error.response.data.error}`
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
