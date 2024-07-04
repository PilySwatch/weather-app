const URL = 'http://localhost:3000'; 

async function getWeatherData(city = 'Berlin') {
  try {
    const response = await fetch(`${URL}/weather?city=${city}`);
    const data = await response.json();
    return data;

  } catch (err) {
        console.log(err);
        throw err; 
    }
}

async function getPoetryData(keyword) {
  try {
    const response = await fetch(`${URL}/poem?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
      console.error('Error fetching poem data:', error.message);
      throw error; 
  }
}

export { getWeatherData, getPoetryData };