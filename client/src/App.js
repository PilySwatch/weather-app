
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
//import getWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('Berlin');
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState(null);

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

  }, [city]);



  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 from-slate-300 via-cyan-700 to-blue-900`}>
      <div className='flex flex-row items-center justify-center py-3'>
        <img src={require("./nimbus.png")} alt="logo" className="w-14 text-white"/>
        <h1 className=" text-white text-3xl font-medium text-decoration-line: underline underline-offset-8 ">NimbusCast</h1>
      </div>
      <TopButtons setCity={setCity} />
      <Inputs setCity={setCity} />

      {weather && (
        <div>
          <TimeAndLocation weather ={ weather }/>
          <TemperatureAndDetails weather ={ weather } unit={ unit } setUnit={setUnit}/>
        </div>
      )}
       

    </div>
  );
}

export default App;
