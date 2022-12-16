"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Stations_1 = __importDefault(require("../models/Stations"));
const createStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, phone, police } = req.body;
    const station = new Stations_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        location,
        phone,
        police
    });
    try {
        const station_1 = yield station.save();
        res.status(201).json({ station });
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
const getStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stationId = req.params.stationId;
    try {
        const station = yield Stations_1.default.findById(stationId);
        return station ? res.status(201).json({ station }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const getAllStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const policeStation = yield Stations_1.default.find();
        return res.status(201).json({ policeStation });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stationId = req.params.stationId;
    return Stations_1.default.findById(stationId)
        .then((station) => {
        if (station) {
            station.set(req.body);
            return station
                .save()
                .then((police) => {
                res.status(201).json({ police });
            })
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const deleteStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stationId = req.params.stationId;
    return Stations_1.default.findByIdAndDelete(stationId)
        .then((station) => (station ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { getStation, getAllStation, updateStation, deleteStation, createStation };
