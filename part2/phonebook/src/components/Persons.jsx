import React from 'react'

function Persons({ searchedPersons }) {
  return (
    <>
      <h2>Numbers</h2>
      {searchedPersons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        )
      })}
    </>
  )
}

export default Persons
