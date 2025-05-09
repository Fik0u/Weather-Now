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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (cityName) => {
    setCity(cityName);
    setLoading(true);
    setError(null);

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric&lang=en`);
        
        setWeatherData(result.data)
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="App">
      <h1>Weather Now</h1>

      {loading && <SpinLoad />}

      <SearchBar onSearch= {handleSearch} />

      {weatherData && <WeatherCard data = {weatherData} />}

      {error && <Error message = {error} />}
    </div>
  );
}

export default App;
