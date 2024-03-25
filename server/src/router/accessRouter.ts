import express, {Request,Response} from 'express';
import { IAccessCode } from '../model/IAccess';
import { generateAccessCode, verifyAccessCode } from '../service/accessCodeService';
import { AccessCode } from '../db/Access.db';
export const authenticationRouter = express.Router();


// flytta till service
authenticationRouter.post('/generateAccessCode', async (
    req: Request <{},{}, IAccessCode>, 
    res: Response<String>
    ) => {
    try {
        const reviewId= req.body.reviewId;
        const passcode = await generateAccessCode(8);
        AccessCode.create({
            reviewId: reviewId,
            passcode: passcode,
            completed: false
        })
        res.status(200).send('Access code generated and sent successfully');
    }  
    catch (e:any) {

        res.status(500).send('Internal server error');
    }
});

authenticationRouter.post('/verifyAccessCode', async (req, res) => {
    try {
    const { reviewId, accessCode } = req.body;
    const validAccessCode = await verifyAccessCode(accessCode, reviewId);
    if (validAccessCode && validAccessCode.passcode === accessCode && !validAccessCode.completed) {
    
        res.status(200).send('Access code verified successfully');
        //fortsätt med att redirectas till given review
    } else {

        res.status(403).send( 'Invalid access code or already completed');
    }
    } catch (error) {

    res.status(500).send('Internal server error');

    }
});



