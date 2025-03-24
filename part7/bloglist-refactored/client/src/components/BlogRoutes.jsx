import { Routes, Route } from 'react-router-dom'
import FormLogin from '../pages/FormLogin'
import Blogs from '../pages/Blogs'
import Users from '../pages/Users'
import CreateNewForm from '../pages/CreateNewForm'
import User from '../pages/User'
import Blog from '../pages/Blog'

function BlogRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<FormLogin />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/:id' element={<Blog />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/:id' element={<User />} />
      <Route path='/createBlog' element={<CreateNewForm />} />
    </Routes>
  )
}

export default BlogRoutes
