"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Police_1 = __importDefault(require("../controllers/Police"));
const router = express_1.default.Router();
router.get('/get', Police_1.default.getAllPolice);
router.get('/get/:policeId', Police_1.default.getPolice);
router.post('/post', Police_1.default.createPolice);
router.patch('/update/:policeId', Police_1.default.updatePolice);
router.delete('/delete/:policeId', Police_1.default.deletePolice);
module.exports = router;
