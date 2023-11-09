const router = require('express').Router();
const controller = require('./controllers/dataController');

// GET
// Weather info + random poem
router.get('/', controller.getData); 

// ! For future:
// POST
//router.post('/events', controller.postEvent);

// DELETE - Testing purposes
//router.delete('/events/:id', controller.deleteEvent); // OPTIONAL - only use in case you want to remove a data record


module.exports = router;