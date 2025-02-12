export const showNotificationWithTimeout = (
  dispatch,
  message,
  timeout = 5000
) => {
  dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, timeout)
}
