import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useState } from 'react'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogs, updateLikeMutation, deleteBlogMutation, newCommentMutation } =
    useBlog()
  const [comment, setComment] = useState('')

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

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    newCommentMutation.mutate({ blogId: blog.id, comment })
    setComment('')
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
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold text-3xl'>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            required
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment'
            className='border rounded-md'
          />
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-800 cursor-pointer text-white rounded-md py-0 px-2 ml-2'
          >
            Add Comment
          </button>
        </form>
        <div>
          {blog.comments.length > 0 ? (
            <ul className='list-disc ml-10'>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog
