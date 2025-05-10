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
  "shower rain": "url('/images/rainy.jpg')",
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

      <SearchBar onSearch= {handleSearch} />

      {weatherData && <WeatherCard data = {weatherData} />}

      {error && <Error message = {error} />}
    </div>
  );
}

export default App;
