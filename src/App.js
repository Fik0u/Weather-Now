import { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import SpinLoad from './components/SpinLoad';
import Error from './components/Error';
import WeatherCard from './components/WeatherCard';

function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('url("/images/default.jpg")');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherBackgrounds = {
  "clear sky": "url('/images/sunny.jpg')",
  "few clouds": "url('/images/cloudy.jpg')",
  "scattered clouds": "url('/images/cloudy.jpg')",
  "overcast clouds": "url('/images/cloudy.jpg')",
  "broken clouds": "url('/images/brokenClouds.jpg')",
  "moderate rain": "url('/images/rainy.jpg')",
  "light rain": "url('/images/rainy.jpg')",
  "rain": "url('/images/rainy.jpg')",
  "thunderstorm": "url('/images/thunderstorm.jpg')",
  "snow": "url('/images/snow.jpg')",
  "mist": "url('/images/foggy.jpg')",
};

  const handleSearch = async (cityName) => {
    setCity(cityName);
    setLoading(true);
    setError(null);

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric&lang=en`);
        
        setWeatherData(result.data);

        const weatherDescription = result.data.weather[0].description;
        setBackground(weatherBackgrounds[weatherDescription] || 'url("/images/default.jpg")');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="App" style={{ backgroundImage: background }}>

      {loading && <SpinLoad />}

      {!weatherData && (
        <>
        <div className='weather-svg'>
          <svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="32" cy="32" r="12" fill="#FFD93B">
        <animate attributeName="r" values="12;13;12" dur="2s" repeatCount="indefinite" />
      </circle>
      <g fill="#D3D3D3">
        <ellipse cx="42" cy="36" rx="10" ry="6" />
        <ellipse cx="34" cy="38" rx="12" ry="8" />
        <ellipse cx="26" cy="36" rx="9" ry="6" />
      </g>
    </g>
  </svg>
        </div>
        <div className='welcome-container'>
          <h2 className='welcome-msg'>🌤️ Welcome to WeatherNow ! Check the weather in any city in one click</h2>
          <p className="suggestions">Suggestions : <span onClick={() => handleSearch('Paris')}>Paris</span>, <span onClick={() => handleSearch('Tokyo')}>Tokyo</span>, <span onClick={() => handleSearch('New York')}>New York</span></p>
        </div>
        </>
      )}

      <SearchBar onSearch= {handleSearch} />

      {weatherData && <WeatherCard data = {weatherData} />}

      {error && <Error message = {error} />}
    </div>
  );
}

export default App;
