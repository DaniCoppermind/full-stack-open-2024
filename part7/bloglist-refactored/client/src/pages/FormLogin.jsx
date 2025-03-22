import { useUser } from '../context/UserContext'
import { useState } from 'react'

const FormLogin = () => {
  const { login, isError, isLoading } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
  }

  return (
    <form className='flex flex-col items-start gap-2' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1'>
        <label className='font-semibold'>Username</label>
        <input
          className='border rounded-md placeholder-gray-600'
          placeholder='Your Username Here'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-semibold'>Password</label>
        <input
          className='border rounded-md placeholder-gray-600'
          placeholder='******'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='cursor-pointer bg-slate-700 hover:bg-slate-600 text-white rounded-md px-5 text-center py-1'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && (
        <p className='font-semibold text-red-500'>
          Invalid Credentials, try again.
        </p>
      )}
    </form>
  )
}

export default FormLogin
