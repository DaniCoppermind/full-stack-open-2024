import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUsers, loginPost, setToken } from '../api/api'
import { authReducer } from '../reducers/authReducer'

const userContext = createContext()

export const useUser = () => {
  const context = useContext(userContext)
  if (!context) throw new Error('useUser must be used within an UserProvider')

  return context
}

const initialState = {
  isAuthenticated: false,
  username: '',
  token: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [users, setUsers] = useState([])

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

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
    <userContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        login,
        logout,
        isLoading: mutationLogin.isLoading,
        isError: mutationLogin.isError,
        isSuccess: mutationLogin.isSuccess,
        users,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
