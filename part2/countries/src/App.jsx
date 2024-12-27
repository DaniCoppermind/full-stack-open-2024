import { useEffect, useState } from 'react'

import servicesCountries from './services/countries'
import Countries from './components/Countries'
import Searcher from './components/Searcher'
import './style.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searcherCountries, setSearcherCountries] = useState('')

  useEffect(() => {
    servicesCountries.getAll().then((dataCountries) => {
      setCountries(dataCountries)
    })
  }, [])

  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searcherCountries.toLowerCase())
  })

  const handleSearchChange = (event) => {
    setSearcherCountries(event.target.value)
  }

  return (
    <>
      <Searcher search={searcherCountries} handleChange={handleSearchChange} />
      <Countries countries={filteredCountries} />
    </>
  )
}

export default App
