import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({value, onChange}) => (
  <p>find countries <input value={value} onChange={onChange}/></p>
)

const ChangeFilterButton = ({value, onClick}) => (
  <button value={value} onClick={() => onClick(value)}>show</button>
)

const Weather = ({city, weather, changeWeatherAction}) => {
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response => {
        changeWeatherAction(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
      <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

const ShowCountry = ({country, weather, changeWeatherAction}) => (
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
    <Weather city={country.capital[0]} weather={weather} changeWeatherAction={changeWeatherAction}/>
  </div> 
)

const ShowCountries = ({countriesToShow, onClickAction, weather, changeWeatherAction}) => {
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
      <ShowCountry country={countriesToShow[0]} weather={weather} changeWeatherAction={changeWeatherAction}/>
    )
  }
}

const App = () =>  {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState({temperature: 0, wind_speed: 0, wind_dir: "N"})

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

  const changeWeatherTo = (data) => {
    const weatherObj = {
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      wind_dir: data.current.wind_dir
    }
    setWeather(weatherObj)
  }

  return (
    <>
      <Filter value={countryFilter} onChange={handleCountryChange} />
      <ShowCountries 
        countriesToShow={countriesToShow} 
        onClickAction={changeFilterTo} 
        weather={weather}
        changeWeatherAction={changeWeatherTo}
      />
    </>
  );
}

export default App;
