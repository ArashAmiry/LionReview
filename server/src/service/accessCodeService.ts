import {IAccessCode } from '../model/IAccess';
import { AccessCode } from '../db/access.db';
import { SendEmail } from './SendEmail';
import TOKEN_KEY from './token_key';
import { TokenHandler } from './TokenHandler';



export async function generateAccessCode(length: number): Promise<string> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let accesscode = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      accesscode += characters.charAt(randomIndex);
  }

  return accesscode;
}

export class AccessManager {
  async accessForm(reviewId: string, accessCode: string): Promise<Boolean> {
    try{
      return await this.verifyAccessCode(reviewId, accessCode)
    }
  
    catch (error) { 
      console.log(error)
      return false
    };
  }
  async verifyAccessCode(accessCode: string, reviewId: string) : Promise<boolean> {
    const codeExists = await AccessCode.findOne({ code: accessCode, reviewId: reviewId, completed: false });
    if(codeExists) return true; else return false;
  }
  
  async createReviewer(reviewID: string, email:string){
    const sendEmail = new SendEmail();
    const tokenGenerator = new TokenHandler();
    const generatePasscode = await generateAccessCode(8);
    const token = tokenGenerator.generateToken(reviewID);
    const accessLink = `http://localhost:8080/auth/${token}`;
    await sendEmail.sendAccessCode(email,generatePasscode,accessLink);

  }
  
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
    await accessCode.save(); */