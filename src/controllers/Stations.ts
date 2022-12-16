import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Stations from '../models/Stations';

const createStation = async (req: Request, res: Response, next: NextFunction) => {
    const { location, phone, police } = req.body;

    const station = new Stations({
        _id: new mongoose.Types.ObjectId(),
        location,
        phone,
        police
    });

    try {
        const station_1 = await station.save();
        res.status(201).json({ station });
    } catch (error) {
        res.status(404).json({ error });
    }
};

const getStation = async (req: Request, res: Response, next: NextFunction) => {
    const stationId = req.params.stationId;

    try {
        const station = await Stations.findById(stationId);
        return station ? res.status(201).json({ station }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const policeStation = await Stations.find();
        return res.status(201).json({ policeStation });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateStation = async (req: Request, res: Response, next: NextFunction) => {
    const stationId = req.params.stationId;

    return Stations.findById(stationId)
        .then((station) => {
            if (station) {
                station.set(req.body);

                return station
                    .save()
                    .then((police) => {
                        res.status(201).json({ police });
                    })
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteStation = async (req: Request, res: Response, next: NextFunction) => {
    const stationId = req.params.stationId;

    return Stations.findByIdAndDelete(stationId)
        .then((station) => (station ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { getStation, getAllStation, updateStation, deleteStation, createStation };
