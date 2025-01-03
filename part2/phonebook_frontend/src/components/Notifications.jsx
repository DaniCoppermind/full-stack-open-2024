import React from 'react'

const Notifications = ({ type, notification }) => {
  if (notification === '') {
    return ''
  }

  return <div className={`notifications ${type}`}>{notification}</div>
}

export default Notifications
