const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

const convertCelsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

const formatTemperature = (temp, units) => {
  return units === 'metric' ? temp.toFixed() + ' °C' : convertCelsiusToFahrenheit(temp).toFixed() + ' °F';
};

export { iconUrlFromCode, convertCelsiusToFahrenheit, formatTemperature };