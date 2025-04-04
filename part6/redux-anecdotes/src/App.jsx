import { useEffect } from 'react'

import AnecdotesForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList/AnecdoteList'
import Filter from './components/Filter/Filter'
import Footer from './components/Footer/Footer'
import Notification from './components/Notification/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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
