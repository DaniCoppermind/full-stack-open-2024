import { useContext, createContext, useEffect, useReducer } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginPost, setToken } from '../api/api'
import { authReducer } from '../hooks/authReducer'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}

const initialState = {
  isAuthenticated: false,
  username: '',
  token: null,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      const formatedUsernameJSON = window.localStorage
        .getItem('username')
        .replaceAll('"', '')

      const newToken = JSON.parse(loggedUserJSON)
      setToken(newToken)
      dispatch({ type: 'LOGIN', payload: { username: formatedUsernameJSON } })
      dispatch({ type: 'SET_TOKEN', payload: { token: newToken } })
    }
  }, [])

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: loginPost,
    onSuccess: (data) => {
      const { token, username } = data
      setToken(token)
      dispatch({ type: 'LOGIN', payload: { username } })
      dispatch({ type: 'SET_TOKEN', payload: { token } })
      window.localStorage.setItem('token', JSON.stringify(token))
      window.localStorage.setItem('username', JSON.stringify(username))
    },
    onError: () => {
      dispatch({ type: 'LOGOUT' })
    },
  })

  const login = (username, password) => {
    mutationLogin.mutate({ username, password })
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        login,
        logout,
        isLoading: mutationLogin.isLoading,
        isError: mutationLogin.isError,
        isSuccess: mutationLogin.isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
