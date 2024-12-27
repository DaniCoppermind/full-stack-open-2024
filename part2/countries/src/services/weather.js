import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = async (capital) => {
  const res = await axios.get(`${BASE_URL}${capital}&appid=${api_key}`)
  return res.data
}

export default { getWeather }
