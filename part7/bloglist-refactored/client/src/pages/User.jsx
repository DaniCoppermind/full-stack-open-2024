import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const User = () => {
  const { id } = useParams()
  const { users } = useUser()
  const { username, blogs } = users.find((user) => user.id === id)

  if (blogs.length === 0) {
    return (
      <h3 className='text-center font-bold text-3xl'>
        {username} hasn&apos;t added blogs yet.
      </h3>
    )
  }

  return (
    <>
      <h3 className='font-bold text-3xl'>{username}</h3>
      <p className='my-4 text-xl'>Added Blogs</p>
      <ul className='list-disc ml-10'>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
