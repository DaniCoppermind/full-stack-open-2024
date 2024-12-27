import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/'
const all = 'api/all' // api/all => get all the countries
const countrieName = 'api/name/' // api/name/{name} get countries with {name}

const getAll = async () => {
  const res = await axios.get(`${BASE_URL}${all}`)
  return res.data
}

export default { getAll }
