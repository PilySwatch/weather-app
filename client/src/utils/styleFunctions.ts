import { convertCelsiusToFahrenheit } from './helperFunctions';
import { WeatherData, ChartDataHourly, ChartDataDaily } from '../Types';

type WeatherDataSubset = Pick<WeatherData, 'weather_description' | 'local_time' | 'temperature'>;

const formatBackground = (weather: WeatherDataSubset | null | undefined): string => {
  if (!weather) return 'bg-gradient-to-b';

  const description = weather.weather_description;
  const localTime = weather.local_time;

  // Extract hours and minutes from localTime
  const timeParts = localTime.split(' ');
  const timeString = timeParts[5]; // "6:00 PM"
  const ampm = timeParts[6]; // "PM"

  let hours = parseInt(timeString.split(':')[0], 10);
  const minutes = parseInt(timeString.split(':')[1], 10);

  // Adjust hours based on AM/PM
  if (ampm === 'PM' && hours < 12) {
    hours += 12; // Convert PM time to 24-hour format
  } else if (ampm === 'AM' && hours === 12) {
    hours = 0; // Convert 12 AM to 0 hours in 24-hour format
  }

  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  // Determine if it's daytime or nighttime
  const currentHour = currentDate.getHours();

  const isDaytime = currentHour >= 6 && currentHour < 20;
    switch (true) {
        case isDaytime:
            switch (true) {
                case description.includes('clear'):
                    return 'bg-day-clear';
                case description.includes('few clouds'):
                    return 'bg-day-few-clouds';
                case description.includes('scattered clouds'):
                    return 'bg-day-scattered-clouds';
                case description.includes('broken clouds'):
                    return 'bg-day-broken-clouds';
                case description.includes('overcast clouds'):
                    return 'bg-day-overcast-clouds';
                case description.includes('shower rain'):
                    return 'bg-day-shower-rain';
                case description.includes('rain') || description.includes('drizzle'):
                    return 'bg-day-rain';
                case description.includes('storm'):
                    return 'bg-day-storm';
                case description.includes('mist'):
                    return 'bg-day-mist';
                case description.includes('snow'):
                    return 'bg-day-snow';
                default:
                    return 'bg-day-default';
            }
        default:
            switch (true) {
                case description.includes('clear'):
                    return 'bg-night-clear';
                case description.includes('few clouds'):
                    return 'bg-night-few-clouds';
                case description.includes('scattered clouds'):
                    return 'bg-night-scattered-clouds';
                case description.includes('broken clouds'):
                    return 'bg-night-broken-clouds';
                case description.includes('overcast clouds'):
                    return 'bg-night-overcast-clouds';
                case description.includes('shower rain') || description.includes('drizzle'):
                    return 'bg-night-shower-rain';
                case description.includes('rain'):
                    return 'bg-night-rain';
                case description.includes('storm'):
                    return 'bg-night-storm';
                case description.includes('mist'):
                    return 'bg-night-mist';
                case description.includes('snow'):
                    return 'bg-night-snow';
                default:
                    return 'bg-night-default';
            }
    }
};

const formatAreaFill = (data: ChartDataHourly[] | ChartDataDaily[] | null | undefined, units: 'metric' | 'imperial'): string => {
    if (!data || data.length === 0) return 'rgba(255, 255, 255, 0.4)';
    const threshold = units === 'metric' ? 19 : 66;
    const temperatures = data.map(d => units === 'metric' ? d.temp : convertCelsiusToFahrenheit(d.temp));
    const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    if (averageTemp <= threshold) return 'rgba(77, 208, 225, 0.4)';
    return 'rgba(255, 204, 128, 0.4)';
};

const formatAreaStroke = (data: ChartDataHourly[] | ChartDataDaily[] | null | undefined, units: 'metric' | 'imperial'): string => {
    if (!data || data.length === 0) return 'rgba(255, 255, 255, 1)';
    const threshold = units === 'metric' ? 19 : 66;
    const temperatures = data.map(d => units === 'metric' ? d.temp : convertCelsiusToFahrenheit(d.temp));
    const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    if (averageTemp <= threshold) return 'rgba(77, 208, 225, 1)';
    return 'rgba(255, 204, 128, 1)';
};

export { formatBackground, formatAreaFill, formatAreaStroke };
