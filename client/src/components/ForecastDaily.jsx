import { iconUrlFromCode } from '../utils/helperFunctions';

const ForecastDaily = ({ weather }) => {
  if (!weather || !weather.forecast_day) {
    // Render loading state or return null if weather or forecast_day is not available
    return null;
  }

  return (
    <div className="border-2 border-slate-100 border-opacity-5 rounded-2xl mr-auto ml-2 mt-4 py-2 px-4 sm:px-6 lg:px-8 bg-gradient-to-br h-fit shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-xl w-[600px]">
      <div className="flex items-center justify-start w-full">
        <p className="font-medium text-white uppercase">5 day step forecast</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between w-full text-white">
        {Object.keys(weather.forecast_day).map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center justify-center">
            <p className="text-sm font-light">{day}</p>
            <img src={ iconUrlFromCode(weather.forecast_day[day].icon) } alt='forecast icon' className='w-12'/>
            <p>{weather.forecast_day[day].temp.toFixed()}ºC</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDaily;
