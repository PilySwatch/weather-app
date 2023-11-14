const { DateTime } = require('luxon');

// TODO: Modify this function in order to have the real time for each city - data endpoints that require time are: 
// TODO:  weather.dt; weather.sys.sunrise, weather.sys.sunset; weather.timezone
// TODO: For more info about each endpoint, go here -> https://openweathermap.org/current
// to format timestamp
const formatToLocalTime = (secs, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).toFormat(format);
// const formatToLocalTime = (secs, utcOffset = 0, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + utcOffset).toFormat(format);




// to render image using the parameter icon from the response
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };