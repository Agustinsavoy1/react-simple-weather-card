import React, { useState, useEffect } from "react";
import axios from "axios";


const Weather = () => {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [weatherData, setWeatherData] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=436638a3a61197913f60432d683d5dc9&units=metric`;

  const getWeather = async () => {
     
    try {
      navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(url);
      console.log(res.data)
      setWeatherData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getWeather();
  }, [url]);

  
  return (
    <div className="bg-gradient-to-br from-yellow-400 to-pink-500 via-red-400 w-full h-screen flex items-center justify-center">
      {weatherData ? <div className="bg-white p-8 bg-opacity-80 rounded-3xl flex space-x-12 items-center shadow-md">
        <div>
          {weatherData.weather ? (
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="weather-icon"
            />
          ) : null}
          {weatherData.weather ? (
            <p className="text-center text-gray-500 mt-2 text-sm">
              {weatherData.weather[0].main}
            </p>
          ) : null}
        </div>
        <div>
          {weatherData.main ? (
            <p className="text-7xl font-bold text-right text-gray-900">
              {weatherData.main.temp}
            </p>
          ) : null}
          {weatherData.name ? (
            <p className="text-gray-500 text-sm">{weatherData.name}</p>
          ) : null}
        </div>
      </div> : null }
    </div>
  );
};

export default Weather;
