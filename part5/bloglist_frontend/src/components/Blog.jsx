import Togglable from './Togglable'

const Blog = ({ blog }) => {
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
      </div>
      <Togglable buttonLabel='View'>
        <div>
          <a href={blog.url} target='_blank'>
            {blog.url}
          </a>
          <div style={likesStyle}>
            <p>{blog.likes}</p>
            <button>like</button>
          </div>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
