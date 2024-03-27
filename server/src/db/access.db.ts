import { Schema } from 'mongoose';
import { IAccessCode } from '../model/IAccess';
import { conn } from "./conn";

const accessCodeSchema: Schema = new Schema({
    reviewId: { 
        type: String, 
        required: true
    },
    passcode: {
        type: String, 
        required: true,
        unique: true
    },
    completed: { 
        type: Boolean, 
        default: false
    },
});

export const AccessCode = conn.model<IAccessCode>('AccessCode', accessCodeSchema);




