import React from 'react'

function Filter({ search, handleChange }) {
  return (
    <div>
      <p>filter shown with</p>
      <input
        value={search}
        onChange={handleChange}
        placeholder='Search person'
      />
    </div>
  )
}

export default Filter
