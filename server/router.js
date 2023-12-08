const router = require('express').Router();
const weatherController = require('./controllers/weatherController');

router.get('/weather', weatherController.getWeatherData);

module.exports = router;