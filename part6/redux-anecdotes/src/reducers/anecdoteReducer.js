/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    viewData(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      console.log(anecdote)
      return state
    },
    sumLike(state, action) {
      const changedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { viewData, sumLike, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const likeAnecdote = (id, changedAnecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(sumLike(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   }
// }

// export const viewData = (id) => {
//   return {
//     type: 'VIEW_DATA',
//     payload: {
//       id,
//     },
//   }
// }

// export const sumLike = (id) => {
//   return {
//     type: 'LIKE_ANECDOTE',
//     payload: {
//       id,
//     },
//   }
// }

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     case 'VIEW_DATA':
//       const anecdoteToView = state.find(
//         (anecdote) => anecdote.id === action.payload.id
//       )
//       console.log(anecdoteToView)
//       return state
//     case 'LIKE_ANECDOTE':
//       const id = action.payload.id

//       const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       }
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       )
//     default:
//       return state
//   }
// }
