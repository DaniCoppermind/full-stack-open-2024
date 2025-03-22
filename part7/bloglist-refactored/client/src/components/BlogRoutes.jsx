import { Routes, Route } from 'react-router-dom'
import FormLogin from '../pages/FormLogin'
import Blogs from '../pages/Blogs'
import Users from '../pages/Users'

function BlogRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<FormLogin />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  )
}

export default BlogRoutes
