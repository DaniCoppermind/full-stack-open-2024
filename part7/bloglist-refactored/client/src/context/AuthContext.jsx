import { useContext, createContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginPost, setToken } from '../api/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}

export const AuthProvider = ({ children }) => {
  // User Authorization
  const [username, setUsername] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      // Only for the name
      const formatedUsernameJSON = window.localStorage
        .getItem('username')
        .replaceAll('"', '')

      const newToken = JSON.parse(loggedUserJSON)
      setToken(newToken)
      setIsAuthenticated(true)
      setUsername(formatedUsernameJSON)
    }
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
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        username,
        isLoading: mutationLogin.isLoading,
        isError: mutationLogin.isError,
        isSuccess: mutationLogin.isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
