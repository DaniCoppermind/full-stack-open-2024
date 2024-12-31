import axios from 'axios'
const BASE_URL = '/api/persons'

const getAll = () => {
  const req = axios.get(BASE_URL)
  return req.then((res) => res.data)
}

const create = (newObject) => {
  const request = axios.post(BASE_URL, newObject)
  return request.then((res) => res.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${BASE_URL}/${id}`, newObject)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
}

const deletePerson = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then((res) => res.data)
}

export default { getAll, create, deletePerson, update }
