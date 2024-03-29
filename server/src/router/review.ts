import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReview } from "../model/IReview";
import { answerModel } from "../db/answer.db";

const reviewService = new ReviewService();

export const reviewRouter = express.Router();

reviewRouter.post("/", async (
    req: Request<{}, {}, Omit<IReview, 'createdBy'>>,
    res: Response<String>
) => {
    try {
        if (req.session.user !== undefined) {
            await reviewService.createReview(req.body, req.session.user);
            res.status(200).send("Review created successfully.");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<IReview[] | string>
) => {
    try {
        if (req.session.user !== undefined) {
            console.log(req.session.user);
            const reviews = await reviewService.getReviews(req.session.user);
            res.status(200).send(reviews);
        } else {
            res.status(400).send("You are not logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/single/:reviewId", async (
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
    req: Request<{}, {}, { reviewId: string, answers: { questionId: string, answer: string }[] }>,
    res: Response<String>
) => {
    try {
        await reviewService.submitReview(req.body.reviewId, req.body.answers);
        res.status(200).send("Answers to review successfully submitted.");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/answer/:questionID", async (
    req: Request<{ questionID: string }, {}, {}>,
    res: Response<String[]>
) => {
    try {
        const response = await reviewService.getAnswers(req.params.questionID);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send(["This question has not been answered yet"])
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.get("/answer/individual/:reviewID", async (
    req: Request<{ reviewID: string }, {}, {}>,
    res: Response<{ questionId: string, answer: string }[][]>
) => {
    try {
        const response = await reviewService.getIndividualAnswers(req.params.reviewID);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send()
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

reviewRouter.delete("/:reviewID", async (
    req: Request<{ reviewID: string }, {}, {}>,
    res: Response<{ deleted: Boolean }>
) => {
    try {
        const review = await reviewService.getReview(req.params.reviewID);
        if (req.session.user === review?.createdBy) {
            const response = await reviewService.deleteReview(req.params.reviewID);

            if (response) {
                await answerModel.deleteMany({reviewId: req.params.reviewID});
                res.status(200).send({ deleted: response });
            } else {
                res.status(400).send();
            }
        } else {
            throw new Error('Unauthorized user.')
        }

    } catch (e: any) {
        res.status(500).send(e.message)
    }
})