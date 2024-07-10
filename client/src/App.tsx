import './App.css';
import { useState, useEffect } from 'react';
import { getWeatherData, getPoetryData } from './services/api-service';
import { formatBackground } from './utils/styleFunctions';

import Weather from './components/Weather';
import ForecastDaily from './components/ForecastDaily';
import ForecastHourly from './components/ForecastHourly';
import WeatherPoem from './components/WeatherPoem';
import Spinner from './components/Spinner';

import { WeatherData, PoemData } from './Types';


const App: React.FC = () => {
    const [city, setCity] = useState<string>('Berlin');
    const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [poemData, setPoemData] = useState<PoemData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const weatherData = await getWeatherData(city);
                if (!weatherData) {
                    throw new Error('City not found');
                }
                setWeather(weatherData);

                const weatherDescription = weatherData.weather_description; 
                const words = weatherDescription.split(' ');
                const keyword = words[1];

                const poemDataResponse = await getPoetryData(keyword);
                if (poemDataResponse) {
                    setPoemData(poemDataResponse); 
                } else {
                    throw new Error('No poem data found');
                }

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

    }, [city, units]);

    return (
        <div className={`min-h-screen flex items-center justify-center w-full ${formatBackground(weather)}`}>
            <div className={`absolute top-0 left-0 w-full h-full animation-zoomInOut`}></div>
                {loading ? (
                    <Spinner />) :
                    (
                        <>
                            <div className='flex flex-col items-center justify-between w-p-2 md:flex-row w-[80%] relative'>
                                <Weather setCity={setCity} units={units} setUnits={setUnits} weather={weather} />
                                <div className='flex flex-col items-center w-full mt-4 just md:mt-0'>
                                    <ForecastHourly weather={weather} units={units} />
                                    <ForecastDaily weather={weather} units={units} />
                                    {poemData && (
                                        <WeatherPoem poemData={poemData} />
                                    )}
                                </div>
                            </div>
                        </>  
                    )
                }
        </div>
    );
};

export default App;

