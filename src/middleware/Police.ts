import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { IPolice } from '../models/Police';
import { IStations } from '../models/Stations';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    police: {
        create: Joi.object<IPolice>({
            name: Joi.string().required(),
            age: Joi.string().required(),
            gender: Joi.string().required(),
            stars: Joi.string().required(),
            phone: Joi.string().required(),
            station: Joi.string().required()
        }),

        update: Joi.object<IPolice>({
            name: Joi.string().required(),
            age: Joi.string().required(),
            gender: Joi.string().required(),
            stars: Joi.string().required(),
            phone: Joi.string().required(),
            station: Joi.string().required()
        })
    },

    station: {
        create: Joi.object<IStations>({
            location: Joi.string().required(),
            phone: Joi.string().required(),
            police: Joi.string().required()
        }),

        update: Joi.object<IStations>({
            location: Joi.string().required(),
            phone: Joi.string().required(),
            police: Joi.string().required()
        })
    }
};
