import AnecdotesForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList/AnecdoteList'
import Filter from './components/Filter/Filter'
import './App.css'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <main className='app-container'>
      <h1 className='app-title'>Anecdotes</h1>
      <AnecdotesForm />
      <Filter />
      <AnecdoteList />
      <Footer />
    </main>
  )
}

export default App
