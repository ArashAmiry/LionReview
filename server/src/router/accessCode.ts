import express, { Request, Response } from "express";
import { AccessCode } from "../service/accessCode";

const accessCodeService = new AccessCode();

export const accessCodeRouter = express.Router();

accessCodeRouter.get("/review", async (
    req: Request<{}, {}, {}, {accessCode: string, reviewId: string}>,
    res: Response<boolean>
) => {
    try {
        const accessCode = req.query.accessCode;
        const reviewId = req.query.reviewId;
        if (!accessCode) {
            return res.status(400).send(false);
        }

        //const result = await accessCodeService.checkCodeStatus(accessCode);
        const result = await accessCodeService.checkCodeStatus(accessCode, reviewId);
        console.log(result)
        if (result === undefined) {
            return res.status(404).send(false);
        }
        if (!result) {
            req.session.accessCode = accessCode;
            req.session.save();
            console.log(req.session);
            return res.status(200).send(true);
        }
        return res.status(409).send(false);
    } catch (e: any) {
        return res.status(500).send(e.message);
    }
});