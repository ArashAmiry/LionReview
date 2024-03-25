import {IAccessCode } from '../model/IAccess';
import { AccessCode } from '../db/Access.db';



export async function generateAccessCode(length: number): Promise<string> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let accesscode = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      accesscode += characters.charAt(randomIndex);
  }

  return accesscode;
}

export async function verifyAccessCode(reviewId: string, accessCode: string ): Promise<IAccessCode | null > {
  const codeExists = await AccessCode.findOne({ rewiewId: reviewId, code: accessCode, completed: false });
  return codeExists;
}



/*
async function terminateSession(requestId: string, passcode: string, completed:boolean): Promise<boolean> {
  const answer: IAnswer | null = await Answer.findOne({ requestId });
  if (answer) {
  await AccessCode.updateOne({ requestId: requestId }, { completed: true });
  return true;
  }
  return false;

*/

  
/*  export async function invalidateAccessCode(accessCode: IAccessCode): Promise<void> {
    accessCode.completed = true;
    await accessCode.save();*/