import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api'

export const fetchBlogs = async () => {
  const res = await axios.get(`${BASE_URL}/blogs`)
  return res.data
}

export const loginPost = async (loginData) => {
  const res = await axios.post(`${BASE_URL}/login`, loginData)
  return res.data
}
