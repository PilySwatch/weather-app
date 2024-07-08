import { useEffect, useState } from 'react';
import { iconUrlFromCode, formatTemperature } from '../utils/helperFunctions';
import { formatAreaFill, formatAreaStroke } from '../utils/styleFunctions';
import TemperatureAreaChart from './TemperatureAreaChart';

const ForecastDaily = ({ weather, units }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (weather && weather.forecast_day) {
            setChartData(transformForecastData(weather.forecast_day));
        }
    }, [weather]);

    const transformForecastData = (forecast) => {
        return Object.keys(forecast).map(day => ({
            day,
            ...forecast[day],
        }));
    };

    if (!weather || !weather.forecast_day || chartData.length === 0) {
        return <div>Loading...</div>;
    }


    return (
        <div className="border-2 border-slate-100 border-opacity-5 rounded-2xl mx-2 my-2 py-4 px-4 bg-gradient-to-br shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-2xl w-full sm:max-w-lg">
            <div className="flex items-center justify-start w-full">
                <p className="font-medium text-white uppercase">5 day step forecast</p>
            </div>
            <hr className="my-1" />
            <div className="absolute inset-0 z-0 w-full px-[11px] py-2 top-[60px]">
                <TemperatureAreaChart data={chartData} strokeColor={formatAreaStroke(chartData)} fillColor={formatAreaFill(chartData)} />
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-between w-full text-white">
                {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-1/2 sm:w-auto">
                        <p className="text-sm font-light">{data.day}</p>
                        <img src={iconUrlFromCode(data.icon)} alt="forecast icon" className="w-12" />
                        <p>{formatTemperature(data.temp, units)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastDaily;



