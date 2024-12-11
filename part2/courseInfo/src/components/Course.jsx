import Content from './Content'
import Header from './Header'

function Course({ course }) {
  const { id, name, parts } = course

  return (
    <main id={id}>
      <Header title={name} />
      <Content parts={parts} />
    </main>
  )
}

export default Course
