import { useState } from 'react'
import { useBlog } from '../context/BlogContext'

const BlogCard = ({ blog }) => {
  const { updateLikeMutation, deleteBlogMutation } = useBlog()
  const [isShow, setisShow] = useState(false)

  const handleLike = () => {
    updateLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    deleteBlogMutation.mutate(blog.id)
  }

  return (
    <div id={blog.id} className='border rounded-md p-2'>
      <div className='flex gap-2 items-center justify-start'>
        <h3>{blog.title}</h3>
        <button
          className='text-xs rounded-md border p-1 cursor-pointer'
          onClick={() => setisShow(!isShow)}
        >
          Show More Details
        </button>
        <button
          onClick={handleDelete}
          className='text-white bg-red-500 rounded-md p-1 border-slate-900 border-1 text-xs cursor-pointer'
        >
          Delete
        </button>
      </div>
      {isShow && (
        <div>
          <p className='font-semibold'>{blog.author}</p>
          <a
            className='underline text-rose-400'
            href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            target='blank'
          >
            {blog.url}
          </a>
          <div className='flex gap-1 items-center'>
            <p>Likes: {blog.likes}</p>
            <button
              onClick={handleLike}
              className='cursor-pointer border rounded-md px-1 text-sm text-white bg-blue-600'
            >
              Like
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogCard
