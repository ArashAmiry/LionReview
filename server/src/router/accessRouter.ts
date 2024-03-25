import express , {Request,Response} from 'express';
import { IAccessCode } from '../model/IAccess';

import { generateAccessCode } from '../service/accessCodeService';
const user: IAccessCode = new ;
const authenticationRouter =express.Router();
authenticationRouter.post('/generateAccessCode', async (
    req: Request <{},{}, IAccessCode>, 
    res: Response<String>
    ) => {
    try {
        const requestId= req.body.requestId;
        const passcode=  await generateAccessCode(8);
        const email = req.body.email;

    // Code to send email with access code
    res.json({ message: 'Access code generated and sent successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
});

authenticationRouter.post('/verifyAccessCode', async (req, res) => {
    try {
    const { requestId, email, accessCode } = req.body;
    const validAccessCode = await getAccessCodeByEmailAndRequestId(email, requestId);
    if (validAccessCode && validAccessCode.passcode === accessCode && !validAccessCode.completed) {
      // Access code is valid, proceed with allowing access
        res.json({ message: 'Access code verified successfully' });
    } else {
        res.status(403).json({ error: 'Invalid access code or already completed' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/completeReview', async (req, res) => {
    try {
    const { requestId, email } = req.body;
    const accessCode = await getAccessCodeByEmailAndRequestId(email, requestId);
    if (accessCode && !accessCode.completed) {
        await invalidateAccessCode(accessCode);
        res.json({ message: 'Review completed successfully' });
    } else {
        res.status(403).json({ error: 'Access code not found or already completed' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
});

