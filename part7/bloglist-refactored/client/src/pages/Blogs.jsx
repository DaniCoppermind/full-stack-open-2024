import { useBlog } from '../context/BlogContext'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const { blogs } = useBlog()
  const { isAuthenticated } = useUser()

  return (
    <section className='flex flex-col gap-4'>
      {isAuthenticated && (
        <div className='flex gap-2 items-center'>
          <h3 className='font-semibold text-xl'>You can create a new blog!</h3>
          <button className='bg-blue-500 hover:bg-blue-800 cursor-pointer text-white rounded-md py-1 px-2'>
            <Link to={'/createBlog'}>Create Blog</Link>
          </button>
        </div>
      )}
      {blogs.map((blog) => (
        <Link
          className='border py-2 px-4'
          key={blog.id}
          to={`/blogs/${blog.id}`}
        >
          <p className='text-purple-500 underline hover:text-purple-800'>
            {blog.title}
          </p>
        </Link>
      ))}
    </section>
  )
}

export default Blogs
