import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const styles = {
    container: {
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '10px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '3px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      borderRadius: '3px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Anecdote</h2>
      <form onSubmit={addAnecdote} style={styles.form}>
        <input
          name='anecdote'
          style={styles.input}
          placeholder='Enter anecdote'
        />
        <button style={styles.button}>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
