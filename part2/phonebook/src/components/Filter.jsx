import React from 'react'

function Filter({ search, handleChange }) {
  return (
    <div>
      <p>filter shown with</p>
      <input value={search} onChange={handleChange} />
    </div>
  )
}

export default Filter
