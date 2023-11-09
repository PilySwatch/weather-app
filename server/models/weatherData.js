require('dotenv').config(); 

// Weather API connection
const openWeatherMap = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
  API_KEY: process.env.WEATHER_SECRET_KEY
};

module.exports = openWeatherMap;

