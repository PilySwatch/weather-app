import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

export default function TemperatureAndDetails({weather, units}) {

  // Format weather description color
  const formatWeatherDescription = () => {
    if (!weather) return 'text-slate-100';
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'text-cyan-300';

    return 'text-orange-200';
  }



  return (
    <div>
      <div className={`flex items-center justify-center py-6 text-xl ${formatWeatherDescription()}`}>
        <p> { weather.details } - {weather.description}</p>
      </div>


      <div className="flex items-center justify-between text-white py-3">
        <img src={ iconUrlFromCode(weather.icon) } alt="" className="w-30"/>

        <p className="text-5xl">{ weather.temp.toFixed() }º</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-start">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{ weather.feels_like.toFixed() }º</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{ weather.humidity.toFixed() }%</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{ weather.speed.toFixed() } km/h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise: {""} <span className="font-medium ml-1"> { formatToLocalTime(weather.sunrise, "hh:mm a") }</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set: {""} <span className="font-medium ml-1"> { formatToLocalTime(weather.sunset, "hh:mm a") }</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">
          High: <span className="font-medium ml-1">{ weather.temp_max.toFixed() }º</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low: <span className="font-medium ml-1">{ weather.temp_min.toFixed() }º</span>
        </p>
      </div>

    </div>

  );
}