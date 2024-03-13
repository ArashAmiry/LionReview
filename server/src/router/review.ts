import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReview } from "../model/IReview";

const reviewService = new ReviewService();

export const reviewRouter = express.Router();

reviewRouter.post("/", async (
    req: Request<{}, {}, IReview>,
    res: Response<String>
) => {
    try {
        await reviewService.createReview(req.body);
        res.status(200).send("Review created successfully."); 
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/:username", async (
    req: Request<{username : string}, {}, {}>,
    res: Response<IReview[]>
) => {
    try {
        const reviews = await reviewService.getReviews(req.params.username);
        res.status(200).send(reviews);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});