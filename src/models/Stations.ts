import { required } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IStations {
    location: String;
    phone: String;
    police: String;
}

export interface IStationsModel extends IStations, Document {}

const StationSchema: Schema = new Schema(
    { location: { type: String, required: true }, phone: { type: String, required: true }, police: { type: String, required: true, ref: 'Police' } },
    { timestamps: true }
);

export default mongoose.model<IStationsModel>('Stations', StationSchema);
