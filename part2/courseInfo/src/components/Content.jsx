import Part from './Part'

function Content({ parts }) {
  // const total = parts.map((part) => {
  //   console.log(part.exercises)
  // })

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <section>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <b>Total of {total} exercises</b>
    </section>
  )
}

export default Content
