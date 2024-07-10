
import { WeatherData, PoemData } from '../Types';
const URL = 'http://localhost:3000';


async function getWeatherData(city: string = 'Berlin'): Promise<WeatherData> {
  try {
    const response = await fetch(`${URL}/weather?city=${city}`);
    const data = await response.json();
    return data as WeatherData;

  } catch (err) {
    console.error('Error fetching weather data:', err);
    throw err;
  }
}


async function getPoetryData(keyword: string): Promise<PoemData> {
  try {
    const response = await fetch(`${URL}/poem?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json()

    return data as PoemData;
  } catch (error: any) {
    console.error('Error fetching poem data:', error.message);
    throw error;
  }
}

export { getWeatherData, getPoetryData };
