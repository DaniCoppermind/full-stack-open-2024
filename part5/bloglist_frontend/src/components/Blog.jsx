const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    border: '1px solid #ccc',
    marginBottom: 5,
    borderRadius: 5,
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
  }

  return (
    <div style={blogStyle}>
      <p>
        <strong>{blog.title} </strong>by
      </p>
      <div>
        <p>
          {blog.author} - {blog.likes} likes
        </p>
      </div>
    </div>
  )
}

export default Blog
