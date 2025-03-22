import { useUser } from '../context/UserContext'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  const { blogs } = useBlog()
  const { username } = useUser()

  return (
    <>
      <p className='text-left text-2xl font-bold my-4 mx-2'>
        {username} logged in
      </p>
      <section className='flex items-start gap-1 flex-wrap'>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>
    </>
  )
}

export default Blogs
