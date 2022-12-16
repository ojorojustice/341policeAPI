import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Police from '../models/Police';

const createPolice = async (req: Request, res: Response, next: NextFunction) => {
    const { name,age,gender,stars,phone,station } = req.body;

    const police = new Police({
        _id: new mongoose.Types.ObjectId(),
        name,
        age,
        gender,
        stars,
        phone,
        station
    });

    try {
        const police_1 = await police
            .save();
        res.status(201).json({ police });
    } catch (error) {
        res.status(404).json({ error });
    }
};

const getPolice = async (req: Request, res: Response, next: NextFunction) => {
    const policeId = req.params.policeId;

    try {
        const police = await Police.findById(policeId);
        return (police ? res.status(201).json({ police }) : res.status(404).json({ message: 'Not found' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllPolice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const policemen = await Police.find();
        return res.status(201).json({ policemen });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updatePolice = async (req: Request, res: Response, next: NextFunction) => {
    const policeId = req.params.policeId;

    return Police.findById(policeId)
        .then((police) => {
            if (police) {
                police.set(req.body);

                return police
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

const deletePolice = async (req: Request, res: Response, next: NextFunction) => {
    const policeId = req.params.policeId;

    try {
        const police = await Police.findByIdAndDelete(policeId);
        return (police ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { getPolice, getAllPolice, updatePolice, deletePolice, createPolice };
