import { useUser } from '../context/UserContext'

function Users() {
  const { users } = useUser()

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Users</h1>
      <table className='border border-gray-300 text-left'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Username</th>
            <th className='py-2 px-4 border-b'>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='py-2 px-4 border-b'>{user.name}</td>
              <td className='py-2 px-4 border-b'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
