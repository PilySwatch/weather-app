
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

  // TODO: clean this function and move it to another file (ex: services/weatherService)
  // TODO: find the way to render also ºF - if not, remove the buttons from Inputs component
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setWeather(data);

      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    getWeatherData();

  }, [city, units]);

  // Format background color
  const formatBackground = () => {
    if (!weather) return 'from-sky-200 via-sky-600 to-sky-900';
    const threshold = units === 'metric' ? 20 : 60
    if (weather.main.temp <= threshold) return 'from-slate-300 via-cyan-700 to-blue-900';

    return 'from-amber-200 via-orange-700 to-rose-900';
  }


  // Weather Poem - Mock data
  const poemData = {
    title: "A Song of Autumn",
    author: "Adam Lindsay Gordon",
    lines: [
      "‘WHERE shall we go for our garlands glad",
      "At the falling of the year,",
      "When the burnt-up banks are yellow and sad,",
      "When the boughs are yellow and sere?",
      "Where are the old ones that once we had,",
      "And when are the new ones near?",
      "What shall we do for our garlands glad",
      "At the falling of the year?’",
      "‘Child! can I tell where the garlands go?",
      "Can I say where the lost leaves veer",
      "On the brown-burnt banks, when the wild winds blow,",
      "When they drift through the dead-wood drear?",
      "Girl! when the garlands of next year glow,",
      "You may gather again, my dear—",
      "But I go where the last year’s lost leaves go",
      "At the falling of the year.’"
    ]
  };

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <div className='flex flex-row items-center justify-center py-3'>
        <img src={require("./nimbus.png")} alt="logo" className="w-14 text-white"/>
        <h1 className=" text-white text-3xl font-medium text-decoration-line: underline underline-offset-8 ">NimbusCast</h1>
      </div>
      <TopButtons setCity={setCity} />
      <Inputs setCity={setCity} units={units} setUnits={setUnits}/>

      {weather && (
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
