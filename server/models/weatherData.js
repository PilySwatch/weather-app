require('dotenv').config(); 

const openWeatherMap = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'http://api.openweathermap.org/geo/1.0/direct',
  API_KEY: process.env.WEATHER_SECRET_KEY
};

module.exports = openWeatherMap;

