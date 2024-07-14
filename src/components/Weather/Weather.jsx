import React, { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("");

 

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError("Geolocation is not available in your browser.");
        }
      );
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude, query = "") => {
    try {
      setLoading(true);
      setWeatherData(null); 

      const url = query
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=86080ce89af1747c4d56032316460148`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=86080ce89af1747c4d56032316460148`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeather = (e) => {
    e.preventDefault();
    fetchWeatherData(null, null, city);
  };

  const getTodayWeather = (weatherList) => {
    const today = new Date().toISOString().split("T")[0];
    return weatherList.filter((forecast) => forecast.dt_txt.startsWith(today));
  };



  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      {position.latitude && (
        <p>
          Your current coords: {position.latitude}, {position.longitude}
        </p>
      )}
      {error && <p className="error">{error}</p>}
      <br />
      <br />
      <form className="weather-input-form" onSubmit={handleFetchWeather}>
        <label>City:</label>
        <input
          value={city}
          type="text"
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Fetch Weather</button>
      </form>

      {loading && (
        <div className="loading">
          <h1>Fetching...</h1>
        </div>
      )}

      {weatherData && (
        <div>
          <h2>Weather Forecast for {weatherData.city.name}</h2>
          <div className="table-responsive">
            <table className="weather-table">
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Temperature (Celsius)</th>
                  <th>Description</th>
                  <th>Icon</th>
                  <th>Humidity (%)</th>
                  <th>Wind Speed (m/s)</th>
                </tr>
              </thead>
              <tbody>
                {getTodayWeather(weatherData.list).map((forecast, index) => (
                  <tr key={index}>
                    <td>{forecast.dt_txt}</td>
                    <td>{forecast.main.temp}</td>
                    <td>{forecast.weather[0].description}</td>
                    <td>
                      <div className="weather-icon">
                        <img
                          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                          alt={forecast.weather[0].description}
                        />
                      </div>
                    </td>
                    <td>{forecast.main.humidity}</td>
                    <td>{forecast.wind.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

};

export default Weather;
