import React from 'react'

const Notifications = ({ type, text }) => {
  if (text === '') {
    return ''
  }

  return <div className={`notifications ${type}`}>{text}</div>
}

export default Notifications
