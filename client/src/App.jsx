import './App.css';
import { useState, useEffect } from 'react';
import { getWeatherData, getPoetryData } from './services/api-service';
import { formatBackground } from './utils/styleFunctions';

import Weather from './components/Weather';
import ForecastDaily from './components/ForecastDaily';
import ForecastHourly from './components/ForecastHourly';
import WeatherPoem from './components/WeatherPoem';
import Spinner from './components/Spinner';

function App() {
    const [city, setCity] = useState('Berlin');
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    const [poemData, setPoemData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const weatherData = await getWeatherData(city);
                if (!weatherData || weatherData.cod === '404') {
                    throw new Error('City not found');
                }
                setWeather(weatherData);

                const weatherDescription = weatherData.weather_description; 
                const words = weatherDescription.split(' ');
                const keyword = words[1];

                const poemData = await getPoetryData(keyword); 
                setPoemData(poemData);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

    }, [city, units]);

    return (
        <div className={`min-h-screen ${formatBackground(weather)} flex items-center justify-center w-full`}>
            <div className="absolute top-0 left-0 w-full h-full animate-zoomInOut"></div>
                {loading ? (
                    <Spinner />) :
                    (
                        <>
                            <div className='flex flex-col items-center justify-between w-p-2 md:flex-row w-[80%] relative'>
                                <Weather setCity={setCity} units={units} setUnits={setUnits} weather={weather} />
                                <div className='flex flex-col items-center w-full mt-4 just md:mt-0'>
                                    <ForecastHourly weather={weather} />
                                    <ForecastDaily weather={weather} />
                                    <WeatherPoem poemData={poemData}/>
                                </div>
                            </div>
                    </>  
                    )
                }
        </div>
    )
}

export default App;

