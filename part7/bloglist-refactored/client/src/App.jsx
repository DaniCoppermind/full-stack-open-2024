import Blogs from './components/Blogs'
import FormLogin from './components/FormLogin'
import { useAuth } from './context/AuthContext.jsx'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <main className='container m-3'>
      <h1 className='font-bold text-4xl my-3'>Blogs</h1>
      {isAuthenticated ? <Blogs /> : <FormLogin />}
    </main>
  )
}

export default App
