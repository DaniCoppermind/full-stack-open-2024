export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        type: action.payload.type,
        message: action.payload.message,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        type: '',
        message: '',
      }
    default:
      return state
  }
}
