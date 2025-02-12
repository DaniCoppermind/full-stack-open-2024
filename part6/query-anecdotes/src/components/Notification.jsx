import { useContext } from 'react'
import AnecdoteContext from '../context/AnecdoteContext'

const Notification = () => {
  const [notification] = useContext(AnecdoteContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notification) {
    style.display = 'none'
  }

  return <div style={style}>{notification}</div>
}

export default Notification
