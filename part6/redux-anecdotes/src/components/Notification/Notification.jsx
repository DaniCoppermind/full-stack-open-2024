import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  return (
    <div className={`notification ${notification ? 'show' : ''}`}>
      {notification}
    </div>
  )
}

export default Notification
