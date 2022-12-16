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
const Police_1 = __importDefault(require("../models/Police"));
const createPolice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const police_1 = yield police
            .save();
        res.status(201).json({ police });
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
const getPolice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const policeId = req.params.policeId;
    try {
        const police = yield Police_1.default.findById(policeId);
        return (police ? res.status(201).json({ police }) : res.status(404).json({ message: 'Not found' }));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const getAllPolice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const policemen = yield Police_1.default.find();
        return res.status(201).json({ policemen });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updatePolice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const deletePolice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const policeId = req.params.policeId;
    try {
        const police = yield Police_1.default.findByIdAndDelete(policeId);
        return (police ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' }));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = { getPolice, getAllPolice, updatePolice, deletePolice, createPolice };
