const openWeatherMap = require('../models/weatherData');

async function getWeatherData(req, res) {
  try {
    const city = req.query.city || 'Berlin';
    const searchParams = { q: city };

    const url = new URL(`${openWeatherMap.BASE_URL}/weather`);
    url.search = new URLSearchParams({ ...searchParams, appid: openWeatherMap.API_KEY, units: 'metric' });

    const response = await fetch(url);
    const weatherData = await response.json();

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data, please try again' });
  }
}

module.exports = { getWeatherData };
