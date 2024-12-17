import React from 'react'

function PersonForm({
  handleSubmit,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
