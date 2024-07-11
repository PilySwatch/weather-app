
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";

import { iconUrlFromCode, convertCelsiusToFahrenheit, formatTemperature } from '../utils/helperFunctions';
import { WeatherData } from '../Types';


interface TemperatureAndDetailsProps {
  weather: WeatherData,
  units: 'metric' | 'imperial';
}

const TemperatureAndDetails: React.FC<TemperatureAndDetailsProps> = ({ weather, units }) => {
  
  const formatWeatherDescription = () => {
    if (!weather) return 'text-slate-100';
    
    const threshold = units === 'metric' ? 19 : 66;
    const currentTemp = units === 'metric' ? weather.temperature : convertCelsiusToFahrenheit(weather.temperature);

    if (currentTemp <= threshold) return 'text-cyan-300';
    
    return 'text-orange-200';
  };

  return (
    <div>
      <div className={`flex items-center justify-center py-6 text-xl ${formatWeatherDescription()} mt-2`}>
        <p> { weather.weather_main } - { weather.weather_description } </p>
      </div>

      <div className='flex items-center justify-between px-5 py-2 text-white'>
        <img src={ iconUrlFromCode(weather.icon) } alt='weather icon' className='w-40'/>

        <p className='text-5xl'>{ formatTemperature(weather.temperature, units ) }</p>

        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-start space-x-2 text-sm font-light'>
            <FaTemperatureThreeQuarters size={18} className='mr-1' />
            Real feel:
            <span className='font-medium'>{ formatTemperature(weather.feels_like, units) }</span>
          </div>

          <div className='flex items-center justify-start space-x-2 text-sm font-light'>
            <MdOutlineWaterDrop size={18} className='mr-1 ml-0.5' />
            Humidity:
            <span className='ml-1 font-medium'>{ weather.humidity.toFixed() }%</span>
          </div>

          <div className='flex items-center justify-between space-x-2 text-sm font-light'>
            <FaWind size={18} className='mx-1' />
            Wind:
            <span className='ml-1 font-medium'>{ weather.wind_speed.toFixed() } km/h</span>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center py-3 text-sm text-white space-x-[6px] mt-2'>
        <FiSunrise />
        <p className='font-light'>
          Rise: {''} <span className='ml-1 font-medium'> { weather.sunrise }</span>
        </p>
        <p className='font-light'>|</p>

        <FiSunset />
        <p className='font-light'>
          Set: {''} <span className='ml-1 font-medium'>{ weather.sunset }</span>
        </p>
        <p className='font-light'>|</p>

        <FaArrowUp />
        <p className='font-light'>
          High: <span className='ml-1 font-medium'>{ formatTemperature(weather.temp_max, units) }</span>
        </p>
        <p className='font-light'>|</p>

        <FaArrowDown />
        <p className='font-light'>
          Low: <span className='ml-1 font-medium'>{ formatTemperature(weather.temp_min, units) }</span>
        </p>
      </div>

    </div>

  );
}

export default TemperatureAndDetails;
