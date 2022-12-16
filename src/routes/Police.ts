import express from 'express';
import controller from '../controllers/Police';

const router = express.Router();

router.get('/get', controller.getAllPolice);
router.get('/get/:policeId', controller.getPolice);
router.post('/post', controller.createPolice);
router.patch('/update/:policeId', controller.updatePolice);
router.delete('/delete/:policeId', controller.deletePolice);

export = router;
