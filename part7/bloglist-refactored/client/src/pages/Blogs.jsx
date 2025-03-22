import { useUser } from '../context/UserContext'
import { useBlog } from '../context/BlogContext'
import BlogCard from '../components/BlogCard'
import CreateNewForm from '../components/CreateNewForm'

const Blogs = () => {
  const { blogs, notification } = useBlog()
  const { logout, username } = useUser()

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
        <CreateNewForm />
      </div>
      <section className='flex items-start gap-1 flex-wrap'>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </section>
      {notification.message && (
        <span className={notification.type}>{notification.message}</span>
      )}
    </>
  )
}

export default Blogs
