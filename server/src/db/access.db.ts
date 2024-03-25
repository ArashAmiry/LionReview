import mongoose, { Document, Model, Schema } from 'mongoose';
import { IAccessCode } from '../model/IAccess';
import { conn } from "./conn";
import { access } from 'fs';

// Define Schema for Access Codes


const accessCodeSchema: Schema = new Schema({
    requestId: { 
        type: String, required: true 
    },
    oneTimePassword: {
        type: String, required: true 
    },
    email: {
        type: String, required: true, unique: true
    },
    completed: { type: Boolean, default: false 
    
    },
});

export const AccessCode = conn.model<IAccessCode>('AccessCode', accessCodeSchema);


/*// Generate and Save Access Code
async function generateAccessCode(requestId: string, password: string, email: string): Promise<IAccessCode> {
    const accessCode: IAccessCode = new AccessCode({ requestId, password, email });
    return await accessCode.save();
}

// Log Session
async function logSession(requestId: string, email: string): Promise<ISessionLog> {
    const sessionLog: ISessionLog = new SessionLog({ requestId, email });
    return await sessionLog.save();
}

// Terminate Session
async function terminateSession(requestId: string): Promise<boolean> {
    const session: ISessionLog | null = await SessionLog.findOne({ requestId });
    if (session) {
    await AccessCode.updateOne({ requestId }, { completed: true });
    return true;
    }
    return false;
}
*/
function generateAccessCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

  // Usage example
const accessCode = generateAccessCode(8); // Generate an 8-character access code
console.log(accessCode);