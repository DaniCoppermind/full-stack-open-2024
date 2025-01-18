import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likesStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible && (
        <div>
          <a href={blog.url} target='_blank' rel='noopener noreferrer'>
            {blog.url}
          </a>
          <div style={likesStyle}>
            <p>{blog.likes}</p>
            <button onClick={handleLike}>Like</button>
          </div>
          <p>Blog created by: {blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
