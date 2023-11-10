
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
// import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react'

function App() {

  const [query, setQuery] = useState({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  // Format background color
  const formatBackground = () => {
    if (!weather) return 'from-sky-200 via-sky-600 to-sky-900';
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-slate-300 via-cyan-700 to-blue-900';

    return 'from-amber-200 via-orange-700 to-rose-900';
  }



  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <div className='flex flex-row items-center justify-center py-3'>
        <img src={require("./nimbus.png")} alt="logo" className="w-14 text-white"/>
        <h1 className=" text-white text-3xl font-medium text-decoration-line: underline underline-offset-8 ">NimbusCast</h1>
      </div>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather} units={units}/>

          {/* <Forecast title="hourly forecast"/>
          <Forecast title="daily forecast"/> */}
        </div>
      )}

    </div>
  );
}

export default App;
