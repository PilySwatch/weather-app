const URL = "http://localhost:3000";

async function getWeatherData() {
  try {
    const data = await fetch(`${URL}/weather`); // we fetch data
    const response = await data.json(); // we format it
    return response; // and we return it
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getWeatherData }