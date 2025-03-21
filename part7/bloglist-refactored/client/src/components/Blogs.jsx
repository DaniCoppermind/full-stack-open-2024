import { useBlog } from '../context/BlogContext'
import BlogCard from './BlogCard'

const Blogs = () => {
  const { logout, username, blogs } = useBlog()
  return (
    <>
      <p>{username} logged in</p>
      <div className='flex flex-col items-start gap-2 my-2'>
        <button
          className='cursor-pointer rounded-md p-1 text-sm border hover:bg-amber-200'
          onClick={logout}
        >
          Logout
        </button>
        <button className='cursor-pointer rounded-md p-1 text-sm border hover:bg-amber-200'>
          Create new
        </button>
      </div>
      <section className='flex flex-col gap-1 flex-wrap'>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>
    </>
  )
}

export default Blogs
