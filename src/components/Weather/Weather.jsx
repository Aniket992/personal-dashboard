import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; 

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: 44.34, lon: 10.99 }); 
  const [useDefaultLocation, setUseDefaultLocation] = useState(true);

  const apiKey = '86080ce89af1747c4d56032316460148';

  const fetchWeather = async (lat, lon, city) => {
    try {
      let response;

      if (city) {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
      } else {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      }

      setWeather(response.data);
    } catch (error) {
      setError('Failed to fetch weather data');
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            setUseDefaultLocation(false);
          },
          () => {
            fetchWeather(location.lat, location.lon);
          }
        );
      } else {
        fetchWeather(location.lat, location.lon);
      }
    };

    if (useDefaultLocation) {
      getLocation();
    } else {
      fetchWeather(location.lat, location.lon);
    }
  }, [useDefaultLocation, location.lat, location.lon]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    fetchWeather(null, null, city);
    setUseDefaultLocation(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-widget">
      <form onSubmit={handleCitySubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="city-input"
        />
        <button type="submit" className="get-weather-button">
          Get Weather
        </button>
      </form>
      <p className="weather-temp">Temperature: {weather.main.temp} °C</p>

      <div className="weather-details">
        <h2 className="weather-title">Weather in {weather.name}</h2>

        <div className="weather-info">
          <div className="weather-main">
            <p>Feels like: {weather.main.feels_like} °C</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Visibility: {weather.visibility / 1000} km</p>
          </div>
          <div className="weather-wind">
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Wind Direction: {weather.wind.deg}°</p>
            <p>Gusts: {weather.wind.gust} m/s</p>
          </div>
          <div className="weather-sun">
            <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="weather-description">
          <p>Weather Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
            className="weather-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Weather;
