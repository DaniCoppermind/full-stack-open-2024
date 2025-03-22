import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
  const res = await axios.get(`${BASE_URL}/blogs`)
  return res.data
}

export const loginPost = async (loginData) => {
  const res = await axios.post(`${BASE_URL}/login`, loginData)
  return res.data
}

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(`${BASE_URL}/blogs`, newBlog, config)
  return res.data
}
