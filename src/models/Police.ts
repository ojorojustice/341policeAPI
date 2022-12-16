import { number, required } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IPolice {
    name: String;
    age: String;
    gender: String;
    stars: String;
    phone: String;
    station: String;
}

export interface IPoliceModel extends IPolice, Document {}

const PoliceSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: String, required: true },
        gender: { type: String, required: true },
        stars: { type: String, required: true },
        phone: { type: String, required: true },
        station: { type: String, required: true }
    },
    { versionKey: false }
);

export default mongoose.model<IPoliceModel>('Police', PoliceSchema);
