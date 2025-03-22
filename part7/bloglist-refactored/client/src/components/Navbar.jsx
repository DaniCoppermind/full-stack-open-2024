import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Navbar() {
  const { isAuthenticated, logout } = useUser()

  return (
    <div className='container flex justify-between items-center mb-10 mx-auto'>
      <h1 className='font-bold text-4xl my-3'>
        <Link to={'/'}>Blogs</Link>
      </h1>
      <nav>
        <ul className='flex items-center gap-4 underline text-slate-600'>
          <li>
            <Link to={'/users'}>Users</Link>
          </li>
          <li>
            <Link to={'/blogs'}>Blogs</Link>
          </li>
          <li>
            <Link to={'/createBlog'}>Create Blog</Link>
          </li>
          {!isAuthenticated ? (
            <li>
              <Link to={'/login'}>login</Link>
            </li>
          ) : (
            <li>
              <button
                className='underline cursor-pointer hover:text-red-500'
                onClick={logout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
