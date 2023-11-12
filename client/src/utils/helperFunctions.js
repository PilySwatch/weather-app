const { DateTime } = require('luxon');

// TODO: add UTC to the timestamp format
// to format timestamp
const formatToLocalTime = (secs, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
  const utcDateTime = DateTime.fromSeconds(secs).setZone("UTC");
  // const localDateTime = utcDateTime.toLocal();
  return utcDateTime.toFormat(format);
};


// to render image using the parameter icon from the response
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };