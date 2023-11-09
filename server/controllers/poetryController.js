const axios = require('axios');
//const { getWeather } = require('./weatherController');


// GET - Random Poem
async function getPoetry(req, res) {
  try {
    // Get random poetry from PoetryDB
    const poetryResponse = await axios.get('https://poetrydb.org/random/5');

    // Extract the poem from the response
    const poem = poetryResponse.data[0];

    res.status(200).json(poem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch poetry, please try again' });
  }
  
}

module.exports = { getPoetry };


// GET - Random Poem based on Weather Description
// async function getPoetryByWeather(req, res) {
//   try {
//     const city = req.params.city || 'Berlin';
//     const weatherResponse = await getWeather(req, res);
//     console.log(weatherResponse)

//     //Ceheck if an error response has already been sent
//     if (res.headersSent) {
//       return;
//     }

//     if (!weatherResponse) {
//       return res.status(500).json({ message: 'Weather data is not available' });
//     }

//     if (!weatherResponse.weather || !weatherResponse.weather[0] || !weatherResponse.weather[0].description) {
//       return res.status(500).json({ message: 'Weather data is not in the expected format' });
//     }

//     const weatherDescription = weatherResponse.weather[0].description;
//     console.log(weatherDescription)
//     const poetryResponse = await axios.get(`https://poetrydb.org/${weatherDescription}/random/5`);
//     console.log(poetryResponse);

//     res.status(200).json(poetryResponse.data);
//   } catch (error) {
//     // Check if an error response has already been sent
//     if (res.headersSent) {
//       return;
//     }

//     console.error(error);
//     res.status(500).json({ message: 'Unable to fetch poetry, please try again' });
//   }
// }

// module.exports = { getPoetryByWeather };

