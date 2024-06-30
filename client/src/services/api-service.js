const URL = 'http://localhost:3000'; 

async function getWeatherData(city = 'Berlin',) {
  try {
    const response = await fetch(`${URL}/weather?city=${city}`);
    const data = await response.json();
    return data;

  } catch (err) {
        console.log(err);
        throw err; 
      }
}

export { getWeatherData};