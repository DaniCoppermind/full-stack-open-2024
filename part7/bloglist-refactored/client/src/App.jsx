import BlogRoutes from './components/BlogRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import { useBlog } from './context/BlogContext.jsx'

function App() {
  const { notification } = useBlog()

  return (
    <>
      <Navbar />
      <main className='container mx-auto'>
        {notification.message && (
          <span className={notification.type}>{notification.message}</span>
        )}
        <BlogRoutes />
      </main>
    </>
  )
}

export default App
