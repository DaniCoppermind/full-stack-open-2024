import { useQuery } from '@tanstack/react-query'
import { getAll } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'

const App = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <div>
        <p>anecdote service not available due to problems in server</p>
        <span>Error: {error.message}</span>
      </div>
    )
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </div>
  )
}

export default App
