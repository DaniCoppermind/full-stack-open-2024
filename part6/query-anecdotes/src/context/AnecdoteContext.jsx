import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext
