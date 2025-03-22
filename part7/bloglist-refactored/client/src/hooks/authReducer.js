export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        username: '',
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      }
    default:
      return state
  }
}
