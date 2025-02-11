import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, timer) => {
  return (dispatch) => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timer)
  }
}

export default notificationSlice.reducer
