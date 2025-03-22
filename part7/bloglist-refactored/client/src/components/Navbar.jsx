import { Link } from 'react-router-dom'

function Navbar() {
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
            <Link to={'/login'}>login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
