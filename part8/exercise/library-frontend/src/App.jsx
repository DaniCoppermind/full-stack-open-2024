import { useEffect, useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Notify } from './components/Notify'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

function App() {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('user-token')
    if (storedToken) {
      setToken(storedToken)
    } else {
      setPage('login')
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>
          recommendations
        </button>
        {!token ? (
          <button onClick={() => setPage('login')}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors setError={notify} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommendations'} />
      <NewBook setError={notify} show={page === 'add'} />
      <Login setToken={setToken} setError={notify} show={page === 'login'} />
    </>
  )
}

export default App
