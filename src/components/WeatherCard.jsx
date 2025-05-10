import React from 'react';
import './styles/WeatherCard.css'

const WeatherCard = ({ data }) => {

  if (!data) return null;
  const { main, weather, name, sys } = data;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];
  const { country } = sys;

  return (
    <div className='weather-card'>
      <div className='weather-top'>
        <div className='icon-section'>
          <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} />
        </div>
        <div className='info-section'>
          <h2>{name}, {country}</h2>
          <p className='temp'>{temp}°C</p>
        </div>
      </div>
      <hr className='divider' />
      <div className='weather-bottom'>
        <p><strong>Humidity:</strong> {humidity}%</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    </div>
  )
}

export default WeatherCard
