const axios = require('axios');
const openWeatherMap = require('../models/weatherData');


// GET - ALL Weather info
async function getData (req, res) {
  try {
    // fetch weather info
    const city = req.params.city || 'Berlin'; // access the city parameter using query string or set default value to Berlin if city not provided
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    const weatherResponse = await axios.get(openWeatherMap.BASE_URL, {
      params: {
        q: city,
        appid: openWeatherMap.API_KEY,
        units: 'metric'
      }
    });

    // fetch random poetry from PoetryDB
    const poetryResponse = await axios.get('https://poetrydb.org/random');

    // extract the weather data and poem from the responses
    const weatherData = weatherResponse.data;
    const poem = poetryResponse.data[0];

    // console.log(poem);
    console.log(poem.lines);
    console.log(weatherData.weather[0].description.toLowerCase());



    // TODO: Fix filter
    // ! ----- NOT WORKING PROPERLY
    // check if weather description exists and filter the poem lines accordingly
    if (poem.poem && weatherData.weather && weatherData.weather.length > 0) {
      const weatherDescription = weatherData.weather[0].description.toLowerCase();
      const weatherWords = weatherDescription.split(' ');

  
      // filter the poem lines based on each word in the weather description
      poem.poem.lines = poem.poem.lines.filter(line => weatherWords.every(word => line.toLowerCase().includes(word)));
    }

    // ! ----- NOT WORKING PROPERLY



    // send both weather and poem in the response
    res.status(200).json({ weather: weatherData, poem });
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch weather data, please try again' });
  }
}


module.exports = { getData };