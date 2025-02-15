import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    if (!baseUrl) return

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(baseUrl)
        setResources(response)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const { data: newResource } = await axios.post(baseUrl, resource)
      setResources((prevResources) => [...prevResources, newResource])
    } catch (error) {
      console.error(error.message)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}
