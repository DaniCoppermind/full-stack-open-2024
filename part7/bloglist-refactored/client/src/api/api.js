import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// USERS METHODS

export const loginPost = async (loginData) => {
  const res = await axios.post(`${BASE_URL}/login`, loginData)
  return res.data
}

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`)
  return res.data
}

// BLOGS METHODS

export const getBlogs = async () => {
  if (!token) {
    throw new Error('No token provided')
  }
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.get(`${BASE_URL}/blogs`, config)
  return res.data
}

export const createBlog = async (newBlog) => {
  if (!token) {
    throw new Error('No token provided')
  }
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(`${BASE_URL}/blogs`, newBlog, config)
  return res.data
}

export const updateBlog = async (updatedBlog) => {
  if (!token) {
    throw new Error('No token provided')
  }
  const config = {
    headers: { Authorization: token },
  }

  await axios.put(`${BASE_URL}/blogs/${updatedBlog.id}`, updatedBlog, config)
  return updatedBlog
}

export const deleteBlog = async (id) => {
  if (!token) {
    throw new Error('No token provided')
  }
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${BASE_URL}/blogs/${id}`, config)
  return id
}
