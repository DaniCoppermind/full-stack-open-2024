import Part from './Part'

function Content({ parts }) {
  return (
    <section>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </section>
  )
}

export default Content
