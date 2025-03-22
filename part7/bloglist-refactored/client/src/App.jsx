import BlogRoutes from './components/BlogRoutes.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className='container mx-auto'>
        <BlogRoutes />
      </main>
    </>
  )
}

export default App
