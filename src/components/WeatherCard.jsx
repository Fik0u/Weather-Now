import React from 'react'

const WeatherCard = ({ data }) => {

  if (!data) return null;
  const { main, weather, name, sys } = data;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];
  const { country } = sys;

  return (
    <div className='weather-card'>
      <h2>{name}, {country}</h2>
      <div className='weather-icon'>
        <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} />
      </div>
      <div className='weather-details'>
        <p>Temperature: {temp}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Description: {description}</p>
      </div>
    </div>
  )
}

export default WeatherCard
