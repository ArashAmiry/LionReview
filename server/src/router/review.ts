import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReviewSession } from "../model/IReviewSession";

const reviewService = new ReviewService();

export const reviewRouter = express.Router();

reviewRouter.post("/", async (
    req: Request<{}, {}, IReviewSession>,
    res: Response<String>
) => {
    try {
        

    } catch (e: any) {
        res.status(500).send(e.message);
    }

})