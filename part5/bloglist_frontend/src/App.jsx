import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

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

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification type={messageType} message={message} />}
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <section>
          <p>
            <b>{user.name}</b> logged-in!
            <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogForm addBlog={addBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </section>
      )}
    </div>
  )
}

export default App
