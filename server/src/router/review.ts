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

})

reviewRouter.get("/:reviewId", async (
    req: Request<{ reviewId: string }, {}, {}>,
    res: Response<IReview>
) => {
    try {
        const review = await reviewService.getReview(req.params.reviewId);
        res.status(200).send(review);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

reviewRouter.post("/answer", async (
    req: Request<{}, {}, {questionId: string, answer: string}>,
    res: Response<String>
) => {
    try {
        await reviewService.submitReview(req.body.questionId, req.body.answer);
        res.status(200).send("Answers to review successfully submitted.");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});