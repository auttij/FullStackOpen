import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({value, onChange}) => (
  <p>find countries <input value={value} onChange={onChange}/></p>
)

const ChangeFilterButton = ({value, onClick}) => (
  <button value={value} onClick={() => onClick(value)}>show</button>
)

const ShowCountry = ({country}) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>

    <h2>languages</h2>
    <ul>
      {Object.keys(country.languages).map(lang => 
        <li key={country.languages[lang]}>{country.languages[lang]}</li>  
      )}
    </ul>
    <img src={country.flags.png}></img>
  </div> 
)

const ShowCountries = ({countriesToShow, onClickAction}) => {
  if (countriesToShow.length > 10) {
    return(    
      <p>Too many matches, specify another filter</p>
    )
  }  else if (countriesToShow.length > 1)  {
    return (
      <>
        {countriesToShow.map(country => 
          <p key={country.name.common}>
            {country.name.common}
            <ChangeFilterButton value={country.name.common} onClick={onClickAction}/>
          </p>)}
      </>
    )
  } else if (countriesToShow.length == 0) {
    return (
      <p>No countries match your filter</p>
    )
  } else {
    return(
      <ShowCountry country={countriesToShow[0]}/>
    )
  }
}

const App = () =>  {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
    const countriesFiltered = countries.filter(country => 
      country.name.common.toLowerCase().includes(
        event.target.value.toLowerCase()
      ))
    setCountriesToShow(countriesFiltered)
  }

  const changeFilterTo = (name) => {
    const event = { 'target': {'value': name}}
    handleCountryChange(event)
  }

  return (
    <>
      <Filter value={countryFilter} onChange={handleCountryChange} />
      <ShowCountries countriesToShow={countriesToShow} onClickAction={changeFilterTo}/>
    </>
  );
}

export default App;
