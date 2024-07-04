import './App.css';
import { useState, useEffect } from 'react';
import { getWeatherData, getPoetryData } from './services/api-service';
import { formatBackground } from './utils/styleFunctions';

import Weather from './components/Weather';
import ForecastDaily from './components/ForecastDaily';
import ForecastHourly from './components/ForecastHourly';
import WeatherPoem from './components/WeatherPoem';

function App() {
    const [city, setCity] = useState('Berlin');
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    const [poemData, setPoemData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherData = await getWeatherData(city);
                setWeather(weatherData);

                const weatherDescription = weatherData.weather_description; 
                const words = weatherDescription.split(' ');
                const keyword = words[1];

                const poemData = await getPoetryData(keyword); 
                setPoemData(poemData);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [city, units]);

    return (
        <div className={`min-h-screen ${formatBackground(weather)} flex items-center justify-center animate-zoomInOut w-full`}>
                <div className='flex flex-col items-center justify-between w-p-2 md:flex-row w-[80%]'>
                    <Weather setCity={setCity} units={units} setUnits={setUnits} weather={weather} />
                    <div className='flex flex-col items-center w-full mt-4 just md:mt-0'>
                        <ForecastHourly weather={weather} />
                        <ForecastDaily weather={weather} />
                        <WeatherPoem poemData={poemData}/>
                    </div>
                </div>
            
        </div>
    );
}

export default App;

