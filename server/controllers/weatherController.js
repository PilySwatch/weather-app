const { DateTime } = require('luxon');
const openWeatherMap = require('../models/weatherData');

async function getWeatherData(req, res) {
  try {
    const city = req.query.city || 'Berlin';
    const country = req.query.country || '';

    // Step 1: Fetch geolocation data
    const geoUrl = new URL(`http://api.openweathermap.org/geo/1.0/direct`);
    geoUrl.search = new URLSearchParams({
      q: `${city},${country}`,
      limit: 1,
      appid: openWeatherMap.API_KEY
    });

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    // console.log('GeoData: ', geoData)

    const { lat, lon, name } = geoData[0];

    // Step 2: Fetch weather data using coordinates
    const weatherUrl = new URL(`${openWeatherMap.BASE_URL}/weather`);
    weatherUrl.search = new URLSearchParams({
      lat,
      lon,
      appid: openWeatherMap.API_KEY,
      units: 'metric',
      name: name,
    });

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // console.log(weatherData)

    // Step 3: Format sunrise and sunset times using Luxon
    const sunriseTimestamp = weatherData.sys.sunrise * 1000; // Convert from seconds to milliseconds
    const sunsetTimestamp = weatherData.sys.sunset * 1000; // Convert from seconds to milliseconds

    let sunriseDateTime = DateTime.fromMillis(sunriseTimestamp);
    let sunsetDateTime = DateTime.fromMillis(sunsetTimestamp);

    // Adjust for timezone offset
    const timezoneOffsetSeconds = weatherData.timezone;
    sunriseDateTime = sunriseDateTime.plus({ seconds: timezoneOffsetSeconds });
    sunsetDateTime = sunsetDateTime.plus({ seconds: timezoneOffsetSeconds });

    // Format sunrise and sunset times
    const formattedSunrise = sunriseDateTime.toFormat("hh:mm a ");
    const formattedSunset = sunsetDateTime.toFormat("hh:mm a ");

    // Step 4: Calculate and format local time
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffsetSeconds * 1000).toLocaleString("en-US", options);

    // Include formatted times in the response data
    const responseData = {
      ...weatherData,
      sunrise: formattedSunrise,
      sunset: formattedSunset,
      localTime,
      name: geoData[0].name 
    };

    res.json(responseData);
    // console.log('City and Time Searched:', responseData.name, '-', responseData.localTime);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data, please try again' });
  }
}

module.exports = { getWeatherData };

