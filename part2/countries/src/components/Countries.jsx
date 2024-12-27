import { useState } from 'react'
import SelectedCountry from './SelectedCountry'
import CountryList from './CountryList'

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  if (countries.length === 0 || countries.length === 250) {
    return <p>Find your country</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    const country = countries[0]
    const languages = Object.keys(country.languages)

    return (
      <SelectedCountry
        languages={languages}
        selectedCountry={country}
        setSelectedCountry={setSelectedCountry}
        showHideButton={false}
      />
    )
  }

  if (selectedCountry) {
    const languages = Object.keys(selectedCountry.languages)

    return (
      <SelectedCountry
        languages={languages}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        showHideButton={true}
      />
    )
  }

  return <CountryList countries={countries} onShowCountry={handleShowCountry} />
}

export default Countries
