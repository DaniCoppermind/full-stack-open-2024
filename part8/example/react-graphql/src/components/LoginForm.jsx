import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

function LoginForm({ setToken, setError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      console.log(result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            type='text'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
