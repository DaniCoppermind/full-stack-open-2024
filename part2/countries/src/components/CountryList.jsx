const CountryList = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <div className='countries' key={country.cca3}>
          <li>{country.name.common}</li>
          <button onClick={() => onShowCountry(country)}>show</button>
        </div>
      ))}
    </ul>
  )
}

export default CountryList
