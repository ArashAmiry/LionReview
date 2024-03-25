import {IAccessCode } from '../model/IAccess';
import { AccessCode } from '../db/access.db';



  export function generateAccessCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

//få denna kopplad till en knapp. denna ska egentligen startas efter att sessionen påbörjat sedan 


  
  export async function getAccessCodeByEmailAndRequestId(email: string, requestId: string): Promise<IAccessCode | null> {
    return await AccessCode.findOne({ email, requestId });
  }
  
  export async function invalidateAccessCode(accessCode: IAccessCode): Promise<void> {
    accessCode.completed = true;
    await accessCode.save();