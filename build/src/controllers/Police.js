"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Police_1 = __importDefault(require("../models/Police"));
const createPolice = (req, res, next) => {
    const { name, age, gender, stars, phone, station } = req.body;
    const police = new Police_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        age,
        gender,
        stars,
        phone,
        station
    });
    return police
        .save()
        .then((police) => {
        res.status(201).json({ police });
    })
        .catch((error) => {
        res.status(404).json({ error });
    });
};
const getPolice = (req, res, next) => {
    const policeId = req.params.policeId;
    return Police_1.default.findById(policeId)
        .then((police) => (police ? res.status(201).json({ police }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const getAllPolice = (req, res, next) => {
    return Police_1.default.find()
        .then((policemen) => res.status(201).json({ policemen }))
        .catch((error) => res.status(500).json({ error }));
};
const updatePolice = (req, res, next) => {
    const policeId = req.params.policeId;
    return Police_1.default.findById(policeId)
        .then((police) => {
        if (police) {
            police.set(req.body);
            return police
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
const deletePolice = (req, res, next) => {
    const policeId = req.params.policeId;
    return Police_1.default.findByIdAndDelete(policeId)
        .then((police) => (police ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { getPolice, getAllPolice, updatePolice, deletePolice, createPolice };
