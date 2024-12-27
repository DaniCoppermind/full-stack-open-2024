import { useEffect, useState } from 'react'
import servicesWeather from '../services/weather'
import WeatherInterface from './WeatherInterface'

const SelectedCountry = ({
  selectedCountry,
  languages,
  showHideButton,
  setSelectedCountry,
}) => {
  const [weather, setWeather] = useState(null)

  const capital = selectedCountry.capital[0]

  useEffect(() => {
    servicesWeather.getWeather(capital).then((data) => {
      setWeather(data)
    })
  }, [])

  if (weather === null) return null

  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{selectedCountry.languages[lang]}</li>
        ))}
      </ul>
      <img
        src={selectedCountry.flags.png}
        alt={`Flag of ${selectedCountry.name.common}`}
        width='100'
      />
      <WeatherInterface capital={capital} weather={weather} />
      {showHideButton && (
        <button onClick={() => setSelectedCountry(null)}>Hide</button>
      )}
    </div>
  )
}

export default SelectedCountry
