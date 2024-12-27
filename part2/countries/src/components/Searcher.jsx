import React from 'react'

const Searcher = ({ search, handleChange }) => {
  return (
    <div className='searcher'>
      <p>Find countries</p>
      <input type='text' onChange={handleChange} value={search} />
    </div>
  )
}

export default Searcher
