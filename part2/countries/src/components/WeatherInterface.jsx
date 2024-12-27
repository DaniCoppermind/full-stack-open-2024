import React from 'react'

const urlIconWeather = 'http://openweathermap.org/img/wn/'

const WeatherInterface = ({ capital, weather }) => {
  return (
    <div>
      <br />
      <b>Weather in {capital}</b>
      <p>{`Temperature ${(weather.main.temp - 273.5).toFixed(2)} Celsius`}</p>
      <img
        alt='icon weather'
        src={`${urlIconWeather}${weather.weather[0].icon}@2x.png`}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default WeatherInterface
