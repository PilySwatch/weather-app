require('dotenv').config(); 

const openWeatherMap = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: process.env.WEATHER_SECRET_KEY
};

module.exports = openWeatherMap;

