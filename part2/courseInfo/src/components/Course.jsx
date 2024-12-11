import Content from './Content'
import Header from './Header'

function Course({ courses }) {
  return (
    <>
      {courses.map((course) => {
        return (
          <>
            <Header name={course.name} key={course.id} />
            <Content parts={course.parts} />
          </>
        )
      })}
    </>
  )
}

export default Course
