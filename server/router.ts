import { Router } from 'express';
import { getWeatherData } from './controllers/weatherController';
import { getPoemData } from './controllers/poetryController';

const router = Router();

router.get('/weather', getWeatherData);
router.get('/poem', getPoemData);

export default router;
