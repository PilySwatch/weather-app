const axios = require('axios');
const openWeatherMap = require('../models/weatherData');


// GET - ALL Weather info
;

async function getData(req, res) {
  try {
    // Fetch weather info
    const city = req.params.city || 'Berlin';
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

    const weatherData = weatherResponse.data;

    // Fetch random poetry from PoetryDB
    const poetryResponse = await axios.get('https://poetrydb.org/random/5');
    const poems = poetryResponse.data;
    //console.log(poems);

    // Extract words from weather description
    const weatherWords = weatherData.weather[0].description.split(' ');

    // Filter poems to include only those with weather words
    const filteredPoems = poems.filter(poem =>
      poem.lines.some(line =>
        weatherWords.some(word => line.includes(word))
      )
    );

    if (filteredPoems.length === 0) {
      return res.status(404).json({ message: 'No matching poems found for the weather description' });
    }

    // Select the first filtered poem
    const selectedPoem = filteredPoems[0];

    // Send both weather and selected poem in the response
    res.status(200).json({ weather: weatherData, poem: { title: selectedPoem.title, lines: selectedPoem.lines } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch data, please try again' });
  }
}
// async function getData (req, res) {
//   try {
//     // fetch weather info
//     const city = req.params.city || 'Berlin'; // access the city parameter using query string or set default value to Berlin if city not provided
//     if (!city) {
//       return res.status(400).json({ message: 'City parameter is required' });
//     }
//     const weatherResponse = await axios.get(openWeatherMap.BASE_URL, {
//       params: {
//         q: city,
//         appid: openWeatherMap.API_KEY,
//         units: 'metric'
//       }
//     });
//     const weatherData = weatherResponse.data;

//     // fetch random poetry from PoetryDB
//     const poetryResponse = await axios.get('https://poetrydb.org/random');

//     // extract the weather data and poem from the responses
//     //const poem = poetryResponse.data[0]; // ! HERE

//     // console.log(poem);
//     // console.log(poem.lines);
//     // console.log(weatherData.weather[0].description.toLowerCase());



//     // // TODO: Fix filter
//     // // ! ----- NOT WORKING PROPERLY
//     // // check if weather description exists and filter the poem lines accordingly
//     // if (poem.poem && weatherData.weather && weatherData.weather.length > 0) {
//     //   const weatherDescription = weatherData.weather[0].description.toLowerCase();
//     //   const weatherWords = weatherDescription.split(' ');

  
//     //   // filter the poem lines based on each word in the weather description
//     //   poem.poem.lines = poem.poem.lines.filter(line => weatherWords.some(word => line.toLowerCase().includes(word)));
//     //   console.log(poem.poem.lines);
//     //   console.log(poem)

//     //   // poem.poem.lines = poem.poem.lines.filter(line => {
//     //   //   weatherWords.every(word => {
//     //   //     try { 
//     //   //       line.toLowerCase().includes(word)
//     //   //       console.log(word);

//     //   //     } catch (error) {
//     //   //       console.error(error);
//     //   //      }
//     //   //   }) 
      
//     //   // })

//     // }

//     // ! ----- NOT WORKING PROPERLY



//     // send both weather and poem in the response
//     res.status(200).json({ weather: weatherData, poem });
    

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Unable to fetch weather data, please try again' });
//   }
// }


async function getWeather(req, res) {
  try {
    // Fetch weather info
    const city = req.params.city || 'Berlin';
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

    // const weatherData = weatherResponse.data;

    res.status(200).json(weatherResponse.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch data, please try again' });
  }
}

module.exports = { getData, getWeather };