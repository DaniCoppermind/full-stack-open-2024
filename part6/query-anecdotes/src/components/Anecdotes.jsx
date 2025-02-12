/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdoteVotes } from '../request'

import { useContext } from 'react'
import AnecdoteContext from '../context/AnecdoteContext'
import { showNotificationWithTimeout } from '../utils/notificationUtils'

const Anecdotes = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(AnecdoteContext)

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdoteVotes,
    onSuccess: (changedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((a) =>
        a.id === changedAnecdote.id ? { ...a, votes: changedAnecdote.votes } : a
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      showNotificationWithTimeout(
        notificationDispatch,
        `You voted for '${changedAnecdote.content}'`
      )
    },
  })

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Anecdotes
