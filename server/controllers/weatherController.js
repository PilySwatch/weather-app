const openWeatherMap = require('../models/weatherData');

// GET - Fetch weather data
async function getWeatherData(req, res) {
  try {
    const city = req.query.city || 'Berlin'; // set Berlin as default value if no city is passed
    const searchParams = { q: city };

    const url = new URL(`${openWeatherMap.BASE_URL}/weather`);
    url.search = new URLSearchParams({ ...searchParams, appid: openWeatherMap.API_KEY, units: 'metric' });
    /* in simpler terms, this last line above is preparing the URL for the API request by 
    taking existing query parameters (searchParams -> {q: 'Berlin'}) and adding the appid 
    parameter with the OpenWeatherMap API key (openWeatherMap.API_KEY) */

    const response = await fetch(url);
    const weatherData = await response.json();

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data, please try again' });
  }
}

module.exports = { getWeatherData };
