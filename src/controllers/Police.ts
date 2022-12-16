import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Police from '../models/Police';

const createPolice = (req: Request, res: Response, next: NextFunction) => {
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

    return police
        .save()
        .then((police) => {
            res.status(201).json({ police });
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};

const getPolice = (req: Request, res: Response, next: NextFunction) => {
    const policeId = req.params.policeId;

    return Police.findById(policeId)
        .then((police) => (police ? res.status(201).json({ police }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getAllPolice = (req: Request, res: Response, next: NextFunction) => {
    return Police.find()
        .then((policemen) => res.status(201).json({ policemen }))
        .catch((error) => res.status(500).json({ error }));
};

const updatePolice = (req: Request, res: Response, next: NextFunction) => {
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

const deletePolice = (req: Request, res: Response, next: NextFunction) => {
    const policeId = req.params.policeId;

    return Police.findByIdAndDelete(policeId)
        .then((police) => (police ? res.status(201).json({ message: 'police deleted' }) : res.status(404).json({ message: 'Not deleted' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { getPolice, getAllPolice, updatePolice, deletePolice, createPolice };
