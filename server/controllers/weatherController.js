const { DateTime } = require('luxon');
const openWeatherMap = require('../models/weatherData');

async function getWeatherData(req, res) {
  try {
    const city = req.query.city || 'Berlin';
    const country = req.query.country || '';

    const geoData = await fetchGeoData(city, country);
    if (!geoData) return res.status(404).json({ error: 'City not found' });

    const { lat, lon } = geoData;

    const weatherData = await fetchWeatherData(lat, lon);
    const forecastData = await fetchForecastData(lat, lon);

    const formattedSunrise = formatTime(weatherData.sys.sunrise, weatherData.timezone);
    const formattedSunset = formatTime(weatherData.sys.sunset, weatherData.timezone);
    const localTime = formatLocalTime(weatherData.timezone);

    const responseData = {
      ...filterWeatherData(city, weatherData, formattedSunrise, formattedSunset, localTime),
      ...filterForecastData(forecastData, weatherData.timezone)
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data, please try again' });
  }
}

async function fetchGeoData(city, country) {
  const geoUrl = new URL('http://api.openweathermap.org/geo/1.0/direct');
  geoUrl.search = new URLSearchParams({
    q: `${city},${country}`,
    limit: 1,
    appid: openWeatherMap.API_KEY,
  });

  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();
  return geoData.length ? geoData[0] : null;
}

async function fetchWeatherData(lat, lon) {
  const weatherUrl = new URL(`${openWeatherMap.BASE_URL}/weather`);
  weatherUrl.search = new URLSearchParams({
    lat,
    lon,
    appid: openWeatherMap.API_KEY,
    units: 'metric'
  });

  const weatherResponse = await fetch(weatherUrl);
  return await weatherResponse.json();
}

async function fetchForecastData(lat, lon) {
  const forecastUrl = new URL(`${openWeatherMap.BASE_URL}/forecast`);
  forecastUrl.search = new URLSearchParams({
    lat,
    lon,
    appid: openWeatherMap.API_KEY,
    units: 'metric'
  });

  const forecastResponse = await fetch(forecastUrl);
  return await forecastResponse.json();
}

function formatTime(timestamp, timezoneOffset) {
  return DateTime.fromMillis(timestamp * 1000).plus({ seconds: timezoneOffset }).toFormat('hh:mm a');
}

function formatLocalTime(timezoneOffset) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  return new Date(utcTime + timezoneOffset * 1000).toLocaleString('en-US', options);
}

function filterWeatherData(city, weatherData, sunrise, sunset, localTime) {
  return {
    city_name: city,
    country: weatherData.sys.country,
    coordinates: weatherData.coord,
    icon: weatherData.weather[0].icon,
    weather_main: weatherData.weather[0].main,
    weather_description: weatherData.weather[0].description,
    temperature: weatherData.main.temp,
    temp_max: weatherData.main.temp_max,
    temp_min: weatherData.main.temp_min,
    feels_like: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    wind_speed: weatherData.wind.speed,
    rain_1h: weatherData.rain ? weatherData.rain['1h'] : 0,
    sunrise,
    sunset,
    local_time: localTime
  };
}

function filterForecastData(forecastData, timezoneOffset) {
  const filteredForecastData = forecastData.list.map(forecast => {
    const forecastDateTime = DateTime.fromSeconds(forecast.dt).plus({ seconds: timezoneOffset });
    return {
      dt: forecast.dt,
      dt_txt: forecast.dt_txt,
      temp: forecast.main.temp,
      weather_main: forecast.weather[0].main,
      description: forecast.weather[0].description,
      wind_speed: forecast.wind.speed,
      time: forecastDateTime.toFormat('h:mm a'),
      date: forecastDateTime.toFormat('yyyy-MM-dd'),
      week_day: forecastDateTime.toFormat('ccc'),
      icon: forecast.weather[0].icon
    };
  });

  const forecastHourly = [];
  const forecastDaily = {};

  filteredForecastData.forEach(forecast => {
    forecastHourly.push({
      time: forecast.time,
      date: forecast.date,
      temp: forecast.temp,
      feels_like: forecast.feels_like,
      weather_main: forecast.weather_main,
      description: forecast.description,
      wind_speed: forecast.wind_speed,
      icon: forecast.icon
    });

    if (forecast.date !== DateTime.local().toFormat('yyyy-MM-dd')) {
      forecastDaily[forecast.week_day] = {
        date: forecast.date,
        time: forecast.time,
        temp: forecast.temp,
        icon: forecast.icon
      };
    }
  });

  return {
    forecast_time: forecastHourly,
    forecast_day: forecastDaily
  };
}

module.exports = { getWeatherData };



