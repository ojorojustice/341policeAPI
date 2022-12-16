"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Stations_1 = __importDefault(require("../models/Stations"));
const createStation = (req, res, next) => {
    const { location, phone, police } = req.body;
    const station = new Stations_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        location,
        phone,
        police
    });
    return station
        .save()
        .then((station) => {
        res.status(201).json({ station });
    })
        .catch((error) => {
        res.status(404).json({ error });
    });
};
const getStation = (req, res, next) => {
    const stationId = req.params.stationId;
    return Stations_1.default.findById(stationId)
        .then((station) => (station ? res.status(201).json({ station }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const getAllStation = (req, res, next) => {
    return Stations_1.default.find()
        .then((policeStation) => res.status(201).json({ policeStation }))
        .catch((error) => res.status(500).json({ error }));
};
const updateStation = (req, res, next) => {
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
};
const deleteStation = (req, res, next) => {
    const stationId = req.params.stationId;
    return Stations_1.default.findByIdAndDelete(stationId)
        .then((station) => (station ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { getStation, getAllStation, updateStation, deleteStation, createStation };
