
import './App.css';
import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/api-service';
import { formatBackground } from './utils/styleFunctions';

// import WeatherPoem from './components/WeatherPoem';
import Weather from './components/Weather';

function App() {
    const [city, setCity] = useState('Berlin');
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    // const [poemData, setPoemData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch weather data
                const weatherData = await getWeatherData(city);
                setWeather(weatherData);


            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [city, units]);

   

    return (
        <div className={`h-screen ${formatBackground(weather)} flex items-center justify-center`}>
            <Weather setCity={setCity} units={units} setUnits={setUnits} weather={weather} />

        </div>
    );
}

export default App;