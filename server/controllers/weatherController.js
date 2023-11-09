const axios = require('axios');
const openWeatherMap = require('../models/weatherData');


// GET - ALL Weather info
async function getWeather(req, res) {
  try {
    // Fetch weather info
    //const city = req.params.city || 'Berlin'; // access the city parameter using query string, or set default value to Berlin if city not provided
    const city = req.params.city || 'Berlin'; // access the city parameter using query string, or set default value to Berlin if city not provided
    const country = req.params.country || 'DE'; // access the country parameter using query string, or set default value to Germany (DE) if country not provided
    console.log(city)
    console.log(country)
    console.log(req.params)

    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const weatherResponse = await axios.get(openWeatherMap.BASE_URL, {
      params: {
        //q: city,
        q: `${city},${country}`,
        appid: openWeatherMap.API_KEY,
        units: 'metric'
      }
    });

    // const weatherData = weatherResponse.data;
    res.status(200).json(weatherResponse.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch data, please try again' });
  }
}


module.exports = { getWeather };