/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { sumLike, viewData } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleLike, handleViewData }) => {
  const styles = {
    container: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      margin: '10px',
      backgroundColor: '#f9f9f9',
      flex: '1 1 30%',
      boxSizing: 'border-box',
    },
    content: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    votes: {
      marginTop: '5px',
      fontSize: '14px',
      color: '#555',
    },
    buttons: {
      marginTop: '10px',
    },
    button: {
      marginRight: '5px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
    voteButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    viewButton: {
      backgroundColor: '#008CBA',
      color: 'white',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>{anecdote.content}</div>
      <div style={styles.votes}>has {anecdote.votes} votes</div>
      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.voteButton }}
          onClick={handleLike}
        >
          vote
        </button>
        <button
          style={{ ...styles.button, ...styles.viewButton }}
          onClick={handleViewData}
        >
          ver data
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const sortAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const style = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }

  return (
    <div style={style.container}>
      {sortAnecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          handleLike={() => dispatch(sumLike(anecdote.id))}
          handleViewData={() => dispatch(viewData(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
