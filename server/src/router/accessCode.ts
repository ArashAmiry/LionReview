import express, { Request, Response } from "express";
import { AccessCode } from "../service/accessCode";

const accessCodeService = new AccessCode();

export const accessCodeRouter = express.Router();

accessCodeRouter.get("/review", async (
    req: Request<{}, {}, {accessCode: string}>,
    res: Response<String>
) => {
    try {
        const result = await accessCodeService.checkCodeStatus(req.body.accessCode);

        if (result === undefined) {
            res.status(404).send("Invalid code");
        }
        if(result) {
            req.session.accessCode = req.body.accessCode;
            req.session.save();
            console.log(req.session)
            res.status(200).send("Valid code");
        }
        res.status(409).send("Code has already been used");

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});