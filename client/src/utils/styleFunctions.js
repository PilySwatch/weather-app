const formatBackground = (weather) => {
  if (!weather) return 'bg-gradient-to-b from-sky-200 via-sky-600 to-sky-900';

  const description = weather.weather[0].description.toLowerCase();
  const localTime = weather.localTime;

  // Extract hours and minutes from localTime
  // Parse the time string into a Date object
  const timeParts = localTime.split(' ');
  
  const timeString = timeParts[5]; // "6:00 PM"

  const ampm = timeParts[6]; // "PM"

  let hours = parseInt(timeString.split(':')[0], 10);
  const minutes = parseInt(timeString.split(':')[1], 10);

  if (ampm === 'PM' && hours < 12) hours += 12; // Convert PM time to 24-hour format

  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes)

  // Determine if it's daytime or nighttime
  const currentHour = currentDate.getHours();
  
  if (currentHour >= 6 && currentHour < 18) { // Daytime (6:00 AM to 5:59 PM)
      if (description.includes('clear')) {
          return 'bg-day-clear';
      } else if (description.includes('clouds')) {
          return 'bg-day-cloudy';
      } else if (description.includes('rain')) {
          return 'bg-day-rainy';
      } else if (description.includes('snow')) {
          return 'bg-day-snowy';
      } else {
          return 'bg-day-default';
      }
  } else { // Nighttime (6:00 PM to 5:59 AM)
      if (description.includes('clear')) {
          return 'bg-night-clear';
      } else if (description.includes('clouds')) {
          return 'bg-night-cloudy';
      } else if (description.includes('rain')) {
          return 'bg-night-rainy';
      } else if (description.includes('snow')) {
          return 'bg-night-snowy';
      } else {
          return 'bg-night-default';
      }
  }
};


export { formatBackground };