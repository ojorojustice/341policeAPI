import { required } from "joi";
import mongoose, {Document, Schema} from "mongoose";



export interface IPolice {
    name: String;
}

export interface IPoliceModel extends IPolice, Document{
    
}


const PoliceSchema: Schema = new Schema (
   { name: {type: String,
    required: true}},
    {versionKey:false}

);


export default mongoose.model<IPoliceModel>('Police', PoliceSchema);