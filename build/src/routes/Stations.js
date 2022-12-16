"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Stations_1 = __importDefault(require("../controllers/Stations"));
const router = express_1.default.Router();
router.get('/get', Stations_1.default.getAllStation);
router.get('/get/:stationId', Stations_1.default.getStation);
router.post('/post', Stations_1.default.createStation);
router.patch('/update/:stationId', Stations_1.default.updateStation);
router.delete('/delete/:stationId', Stations_1.default.deleteStation);
module.exports = router;
