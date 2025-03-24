import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogs, updateLikeMutation, deleteBlogMutation } = useBlog()

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return <p>Blog not found</p>
  }

  const handleLike = () => {
    updateLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    deleteBlogMutation.mutate(blog.id, {
      onSuccess: () => {
        navigate('/blogs')
      },
    })
  }

  return (
    <section className='flex flex-col gap-10'>
      <div className='flex flex-col items-start gap-2'>
        <h2 className='text-4xl font-bold mb-8'>{blog.title}</h2>
        <a
          className='underline text-purple-500 hover:text-purple-800 cursor-pointer'
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          target='_blank'
        >
          {blog.url}
        </a>
        <div className='flex gap-3 items-center'>
          <span>{blog.likes} Likes</span>
          <button
            onClick={handleLike}
            className='bg-blue-500 hover:bg-blue-800 cursor-pointer text-white rounded-md py-0 px-2'
          >
            Like
          </button>
        </div>
        <p>
          Added by <strong>{blog.user.username}</strong>
        </p>
        <button
          className='bg-red-500 hover:bg-red-800 cursor-pointer text-white rounded-md py-0 px-2 mt-4'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div>
        <h3>Comments</h3>
      </div>
    </section>
  )
}

export default Blog
