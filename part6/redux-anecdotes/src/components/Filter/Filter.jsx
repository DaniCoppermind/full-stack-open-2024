import { useDispatch } from 'react-redux'
import { filterChange } from '../../reducers/filterReducer'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div className='filter-container'>
      <input
        className='filter-input'
        type='text'
        onChange={handleChange}
        placeholder='Filter anecdotes'
      />
    </div>
  )
}

export default Filter
