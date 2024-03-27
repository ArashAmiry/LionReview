import { Schema } from 'mongoose';
import { IAccessCode } from '../model/IAccessCode';
import { conn } from "./conn";

const accessCodeSchema: Schema = new Schema({
    reviewId: { 
        type: String, 
        required: true
    },
    completed: { 
        type: Boolean, 
        default: false
    },
});

export const accessModel = conn.model<IAccessCode>('AccessCode', accessCodeSchema);




