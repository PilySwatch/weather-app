import { iconUrlFromCode } from '../utils/helperFunctions';

const ForecastDaily = ({ weather }) => {
  if (!weather || !weather.forecast_day) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-2 border-slate-100 border-opacity-5 rounded-2xl mx-2 my-2 py-4 px-4 bg-gradient-to-br shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-2xl w-full sm:max-w-lg">
      <div className="flex items-center justify-start w-full">
        <p className="font-medium text-white uppercase">5 day step forecast</p>
      </div>
      <hr className="my-1" />
      <div className="flex flex-wrap items-center justify-between w-full text-white">
        {Object.keys(weather.forecast_day).map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center justify-center w-1/2 sm:w-auto">
            <p className="text-sm font-light">{day}</p>
            <img src={iconUrlFromCode(weather.forecast_day[day].icon)} alt='forecast icon' className='w-12'/>
            <p>{weather.forecast_day[day].temp.toFixed()}ºC</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDaily;


