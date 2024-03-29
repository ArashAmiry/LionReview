import express, { Request, Response } from "express";
import { AccessCode } from "../service/accessCode";

const accessCodeService = new AccessCode();

export const accessCodeRouter = express.Router();

accessCodeRouter.get("/review", async (
    req: Request<{}, {}, {}, {accessCode: string}>,
    res: Response<string>
) => {
    try {
        const accessCode = req.query.accessCode;
        console.log(accessCode)
        if (!accessCode) {
            return res.status(400).send("Access code is missing");
        }

        const result = await accessCodeService.checkCodeStatus(accessCode);
        console.log(result)
        if (result === undefined) {
            return res.status(404).send("Invalid code");
        }
        if (!result) {
            req.session.accessCode = accessCode;
            req.session.save();
            console.log(req.session);
            return res.status(200).send("Valid code");
        }
        return res.status(409).send("Code has already been used");
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
});