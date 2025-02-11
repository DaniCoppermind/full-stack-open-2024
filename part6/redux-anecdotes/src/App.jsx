import { useEffect } from 'react'

import AnecdotesForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList/AnecdoteList'
import Filter from './components/Filter/Filter'
import './App.css'
import Footer from './components/Footer/Footer'
import Notification from './components/Notification/Notification'

import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdote) => dispatch(setAnecdotes(anecdote)))
  })

  return (
    <main className='app-container'>
      <h1 className='app-title'>Anecdotes</h1>
      <AnecdotesForm />
      <Filter />
      <Notification />
      <AnecdoteList />
      <Footer />
    </main>
  )
}

export default App
