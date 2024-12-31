import React from 'react'
import personsServices from '../services/persons'

function Persons({ searchedPersons, handleButtonDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      {searchedPersons.map((person) => {
        return (
          <div key={person.id} className='person-container'>
            <p>
              {person.name} - {person.number}
            </p>
            <button
              data-name={person.name}
              data-id={person.id}
              onClick={handleButtonDelete}
            >
              Delete
            </button>
          </div>
        )
      })}
    </>
  )
}

export default Persons
