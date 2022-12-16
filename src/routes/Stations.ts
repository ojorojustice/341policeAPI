import express from 'express';
import controller from '../controllers/Stations';

const router = express.Router();

router.get('/get', controller.getAllStation);
router.get('/get/:stationId', controller.getStation);
router.post('/post', controller.createStation);
router.patch('/update/:stationId', controller.updateStation);
router.delete('/delete/:stationId', controller.deleteStation);

export = router;
