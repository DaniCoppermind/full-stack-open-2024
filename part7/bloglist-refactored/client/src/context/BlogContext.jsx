import { useContext, createContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchBlogs, loginPost } from '../api/api'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useBlog must be used within an UserProvider')

  return context
}

export const BlogProvider = ({ children }) => {
  // Blogs
  const [blogs, setBlogs] = useState([])
  // User Authorization
  const [username, setUsername] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      const formatedUsernameJSON = window.localStorage
        .getItem('username')
        .replaceAll('"', '')
      setIsAuthenticated(true)
      setUsername(formatedUsernameJSON)
    }
  }, [])

  useEffect(() => {
    async function getBlogs() {
      const request = await fetchBlogs()
      setBlogs(request)
    }
    getBlogs()
  }, [])

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: loginPost,
    onSuccess: (data) => {
      const { token, username } = data
      setUsername(username)
      setIsAuthenticated(true)
      window.localStorage.setItem('token', JSON.stringify(token))
      window.localStorage.setItem('username', JSON.stringify(username))
    },
    onError: () => {
      setIsAuthenticated(false)
    },
  })

  const login = (username, password) => {
    mutationLogin.mutate({ username, password })
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUsername('')
  }

  return (
    <BlogContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        username,
        blogs,
        isLoading: mutationLogin.isLoading,
        isError: mutationLogin.isError,
        isSuccess: mutationLogin.isSuccess,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
