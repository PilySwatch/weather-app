import { config } from 'dotenv';
config();

interface OpenWeatherMapConfig {
  BASE_URL: string;
  GEO_URL: string;
  API_KEY: string | undefined;
}

const openWeatherMap: OpenWeatherMapConfig = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'http://api.openweathermap.org/geo/1.0/direct',
  API_KEY: process.env.WEATHER_SECRET_KEY
};

export default openWeatherMap;


