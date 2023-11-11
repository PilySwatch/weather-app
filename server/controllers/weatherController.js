const openWeatherMap = require('../models/weatherData'); 

// TODO: Clean code - Any of the functions before getWeatherData aren't worth it

// ----------- Format weather response from API
// The response is a nested object so we want to transform it into an object
// with only the values we need for our front
const formatWeatherResponse = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    timezone,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed }
  } = data;

  const { main: details, description, icon } = weather[0];

  return {
    lat, lon, temp, feels_like, temp_min, temp_max, humidity,
    name, dt, timezone, country, sunrise, sunset, details, description, icon, speed
  };
};

// -----------  Fetch weather data from the API and format the response with the function above: formatWeatherResponse()
const getFormattedWeatherData = async (searchParams) => {
  try {
    const url = new URL(`${openWeatherMap.BASE_URL}/weather`);
    url.search = new URLSearchParams({...searchParams, appid: openWeatherMap.API_KEY}); 
    /* in simpler terms, this last line above is preparing the URL for the API request by 
    taking existing query parameters (searchParams -> {q: 'Berlin'}) and adding the appid 
    parameter with the OpenWeatherMap API key (openWeatherMap.API_KEY) */
    //console.log(searchParams)


    const response = await fetch(url);
    const weatherData = await response.json();
    //console.log(weatherData)

    const formatWeatherResponse = (data) => {
      const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        timezone,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
      } = data;
    
      const { main: details, description, icon } = weather[0];
    
      return {
        lat, lon, temp, feels_like, temp_min, temp_max, humidity,
        name, dt, timezone, country, sunrise, sunset, details, description, icon, speed
      };
    };

    // return formatWeatherResponse(weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Unable to fetch weather data');
  }
};

// -----------  GET - build get endpoint based on the functions above
async function getWeatherData(req, res) {
  try {
    const city = req.query.city || 'Berlin'; // set Berlin as default value if no city is passed
    const searchParams = { q: city };

    const formattedWeatherData = await getFormattedWeatherData(searchParams);
    res.json(formattedWeatherData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data, please try again' });
  }
}

module.exports = { getWeatherData };