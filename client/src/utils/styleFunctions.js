import { convertCelsiusToFahrenheit } from './helperFunctions';

const formatBackground = (weather) => {
  if (!weather) return 'bg-gradient-to-b';

  const description = weather.weather_description;
  const localTime = weather.local_time;

  // Extract hours and minutes from localTime
  // Parse the time string into a Date object
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
  currentDate.setMinutes(minutes)

  // Determine if it's daytime or nighttime
  const currentHour = currentDate.getHours();
  
  if (currentHour >= 6 && currentHour < 20) { // Daytime (6:00 AM to 5:59 PM)
    if (description.includes('clear')) {
        return 'bg-day-clear';
    } else if (description.includes('few clouds')) {
        return 'bg-day-few-clouds';
    } else if (description.includes('scattered clouds')) {
        return 'bg-day-scattered-clouds';
    } else if (description.includes('broken clouds')) {
        return 'bg-day-broken-clouds';
    } else if (description.includes('overcast clouds')) {
        return 'bg-day-overcast-clouds';
    } else if (description.includes('shower rain')) {
        return 'bg-day-shower-rain';
    } else if (description.includes('rain') || description.includes('drizzle')) {
        return 'bg-day-rain';
    } else if (description.includes('storm')) {
        return 'bg-day-storm';
    } else if (description.includes('mist')) {
        return 'bg-day-mist';
    } else if (description.includes('snow')) {
        return 'bg-day-snow';
    } else {
        return 'bg-day-default';
    }
  } else { // Nighttime (6:00 PM to 5:59 AM)
      if (description.includes('clear')) {
          return 'bg-night-clear';
        } else if (description.includes('few clouds')) {
            return 'bg-night-few-clouds';
        } else if (description.includes('scattered clouds')) {
            return 'bg-night-scattered-clouds';
        } else if (description.includes('broken clouds')) {
            return 'bg-night-broken-clouds';
        } else if (description.includes('overcast clouds')) {
            return 'bg-night-overcast-clouds';    
        } else if (description.includes('shower rain') || description.includes('drizzle')) {
            return 'bg-night-shower-rain';
        } else if (description.includes('rain')) {
            return 'bg-night-rain';
        } else if (description.includes('storm')) {
            return 'bg-night-storm';
        } else if (description.includes('mist')) {
            return 'bg-night-mist';
        } else if (description.includes('snow')) {
            return 'bg-night-snow';
        } else {
          return 'bg-night-default';
      }
  }
};


const formatAreaFill = (data, units) => {
    if (!data || data.length === 0) return 'rgba(255, 255, 255, 0.4)';
    const threshold = units === 'metric' ? 19 : 66;
    const temperatures = data.map(d => units === 'metric' ? d.temp : convertCelsiusToFahrenheit(d.temp));
    const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    if (averageTemp <= threshold) return 'rgba(77, 208, 225, 0.4)';
    return 'rgba(255, 204, 128, 0.4)';
};

const formatAreaStroke = (data, units) => {
    if (!data || data.length === 0) return 'rgba(255, 255, 255, 1)';
    const threshold = units === 'metric' ? 19 : 66;
    const temperatures = data.map(d => units === 'metric' ? d.temp : convertCelsiusToFahrenheit(d.temp));
    const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    if (averageTemp <= threshold) return 'rgba(77, 208, 225, 1)';
    return 'rgba(255, 204, 128, 1)';
};

export { formatBackground, formatAreaFill, formatAreaStroke };