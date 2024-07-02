
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons';
import { iconUrlFromCode } from '../utils/helperFunctions';

export default function TemperatureAndDetails({ weather, units }) {

  const formatWeatherDescription = () => {
    if (!weather) return 'text-slate-100';
    const threshold = units === 'metric' ? 19 : 60
    if (weather.temperature <= threshold) return 'text-cyan-300';

    return 'text-orange-200';
  }

  return (
    <div>
      <div className={`flex items-center justify-center py-6 text-xl ${formatWeatherDescription()}`}>
        <p> { weather.weather_main } - { weather.weather_description } </p>
      </div>


      <div className='flex items-center justify-between py-3 text-white'>
        <img src={ iconUrlFromCode(weather.icon) } alt='weather icon' className='w-30'/>

        <p className='text-5xl'>{ weather.temperature.toFixed() }ºC</p>

        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-start text-sm font-light'>
            <UilTemperature size={18} className='mr-1' />
            Real feel:
            <span className='ml-1 font-medium'>{ weather.feels_like.toFixed()}ºC</span>
          </div>

          <div className='flex items-center justify-center text-sm font-light'>
            <UilTear size={18} className='mr-1' />
            Humidity:
            <span className='ml-1 font-medium'>{ weather.humidity.toFixed() }%</span>
          </div>

          <div className='flex items-center justify-center text-sm font-light'>
            <UilWind size={18} className='mr-1' />
            Wind:
            <span className='ml-1 font-medium'>{ weather.wind_speed.toFixed() } km/h</span>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center py-3 space-x-2 text-sm text-white'>
        <UilSun />
        <p className='font-light'>
          Rise: {''} <span className='ml-1 font-medium'> { weather.sunrise }</span>
        </p>
        <p className='font-light'>|</p>

        <UilSunset />
        <p className='font-light'>
          Set: {''} <span className='ml-1 font-medium'>{ weather.sunset }</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowUp />
        <p className='font-light'>
          High: <span className='ml-1 font-medium'>{ weather.temp_max.toFixed() }ºC</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowDown />
        <p className='font-light'>
          Low: <span className='ml-1 font-medium'>{ weather.temp_min.toFixed() }ºC</span>
        </p>
      </div>

    </div>

  );
}