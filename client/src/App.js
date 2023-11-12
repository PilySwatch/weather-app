
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
//import getWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';
import WeatherPoem from './components/WeatherPoem';

function App() {
  const [city, setCity] = useState('Berlin');
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null);
  const [poemData, setPoemData] = useState(null);

  // TODO: clean this function and move it to another file (ex: services/weatherService)
  // TODO: find the way to render also ºF - if not, remove the buttons from Inputs component

  // ---------- Fetch weather data
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setWeather(data);
        getPoetryData(data.weather[0].description); // Use weather.weather[0].main as the keyword

      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    getWeatherData();

  }, [city, units]);


  // ---------- Fetch poetry data
  const getPoetryData = async (keyword) => {
    try {
      const response = await fetch(`https://poetrydb.org/lines,poemcount/[${keyword}];20`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        // Find the poem with the most occurrences of the keyword
        let maxOccurrences = 0;
        let selectedPoem = null;
  
        data.forEach((poem) => {
          const occurrences = (poem.lines.join(' ').match(new RegExp(keyword, 'gi')) || []).length;
  
          if (occurrences > maxOccurrences) {
            maxOccurrences = occurrences;
            selectedPoem = poem;
          }
        });
  
        if (selectedPoem) {
          setPoemData({
            title: selectedPoem.title,
            author: selectedPoem.author,
            lines: selectedPoem.lines,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching poetry data:', error.message);
    }
  };

  // ----------  Format background color
  const formatBackground = () => {
    if (!weather) return 'from-sky-200 via-sky-600 to-sky-900';
    const threshold = units === 'metric' ? 20 : 60
    if (weather.main.temp <= threshold) return 'from-slate-300 via-cyan-700 to-blue-900';

    return 'from-amber-200 via-orange-700 to-rose-900';
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <div className='flex flex-row items-center justify-center py-3'>
        <img src={require("./nimbus.png")} alt="logo" className="w-14 text-white"/>
        <h1 className=" text-white text-3xl font-medium text-decoration-line: underline underline-offset-8 ">NimbusCast</h1>
      </div>
      <TopButtons setCity={setCity} />
      <Inputs setCity={setCity} units={units} setUnits={setUnits}/>

      {weather && poemData && (
        <div>
          <TimeAndLocation weather ={weather} />
          <TemperatureAndDetails weather={weather} units={units} />
          <WeatherPoem {...poemData}/>
        </div>
      )}
       

    </div>
  );
}

export default App;



