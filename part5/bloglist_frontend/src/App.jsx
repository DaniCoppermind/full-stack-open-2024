import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.setToken)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessageType('success')
      setMessage('Login successful')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessageType('success')
      setMessage(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setMessage('Error adding blog')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const confirmDelete = window.confirm(
      `Do you really want to delete the blog "${blog.title}" by ${blog.author}?`
    )
    if (!confirmDelete) {
      return
    }

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
      setMessageType('success')
      setMessage('Blog deleted successfully')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setMessage('Error deleting blog')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      const updatedReturnedBlog = { ...returnedBlog, user: blog.user }
      setBlogs(blogs.map((b) => (b.id !== id ? b : updatedReturnedBlog)))
    } catch (exception) {
      setMessageType('error')
      setMessage('Error liking blog')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification type={messageType} message={message} />}
      {user === null ? (
        <Togglable buttonLabel='Login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <section>
          <p>
            <b>{user.name}</b> logged-in!
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel='Create'>
            <BlogForm addBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog.id)}
              handleDelete={() => deleteBlog(blog.id)}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default App
