const router = require('express').Router();
const weatherController = require('./controllers/weatherController');
const poetryController = require('./controllers/poetryController');

router.get('/weather', weatherController.getWeatherData);
router.get('/poem', poetryController.getPoemData);

module.exports = router;