const { DateTime } = require('luxon');

// to format timestamp
const formatToLocalTime = (secs, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
  DateTime.fromSeconds(secs).toFormat(format);

// to render image using the parameter icon from the response
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };