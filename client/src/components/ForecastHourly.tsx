import TemperatureAreaChart from './TemperatureAreaChart';
import { WeatherData, ChartDataHourly } from '../Types';
import { iconUrlFromCode, formatTemperature } from '../utils/helperFunctions';
import { formatAreaFill, formatAreaStroke } from '../utils/styleFunctions';

interface ForecastHourlyProps {
  weather: WeatherData | null;
  units: 'metric' | 'imperial';
}


const ForecastHourly: React.FC<ForecastHourlyProps> = ({ weather, units }) => {
  if (!weather || !weather.forecast_time) {
    return <div>Loading...</div>;
  }

  // first 5 hours of forecast data
  const forecastData = weather.forecast_time.slice(0, 5);

  // transform data for area chart
  const chartData: ChartDataHourly[] | null | undefined = forecastData.map(data => ({
    time: data.time,
    temp: data.temp,
  }));

  return (
    <div className="border-2 border-slate-100 border-opacity-5 rounded-2xl mx-2 my-2 py-4 px-4 bg-gradient-to-br shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-2xl w-full sm:max-w-lg">
      <div className="flex items-center justify-start w-full">
        <p className="font-medium text-white uppercase">3 hour step forecast</p>
      </div>
      <hr className="my-1" />
      <div className="absolute inset-0 z-0 w-full px-[11px] py-2 top-[60px]">
        <TemperatureAreaChart
          data={chartData}
          strokeColor={formatAreaStroke(chartData, units)}
          fillColor={formatAreaFill(chartData, units)}
        />
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-between w-full text-white">
        {forecastData.map((data, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-1/2 sm:w-auto">
            <p className="text-sm font-light">{data.time}</p>
            <img src={iconUrlFromCode(data.icon)} alt="forecast icon" className="w-12" />
            <p>{formatTemperature(data.temp, units)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastHourly;




