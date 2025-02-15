import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data: response } = await axios.get(`${baseUrl}/${name}`)
        setCountry(response)
      } catch (error) {
        setError('Country not found')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [name])

  return { country, loading, error }
}
