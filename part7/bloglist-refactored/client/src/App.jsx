import Blogs from './components/Blogs'
import FormLogin from './components/FormLogin'
import { useBlog } from './context/BlogContext'

function App() {
  const { isAuthenticated } = useBlog()

  return (
    <main className='container m-3'>
      <h1 className='font-bold text-4xl my-3'>Blogs</h1>

      {isAuthenticated ? <Blogs /> : <FormLogin />}
    </main>
  )
}

export default App
