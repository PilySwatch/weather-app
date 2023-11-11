const router = require('express').Router();
const weatherController = require('./controllers/weatherController');
//const poetryController = require('./controllers/poetryController');

// GET
// Weather info + random poem
//router.get('/', controller.getData); 

router.get('/weather', weatherController.getWeatherData);

//router.get('/poetry', poetryController.getPoetry);
//router.get('/poetry', poetryController.getPoetryByWeather);


// ! For future:
// POST
//router.post('/events', controller.postEvent);

// DELETE - Testing purposes
//router.delete('/events/:id', controller.deleteEvent); // OPTIONAL - only use in case you want to remove a data record


module.exports = router;