import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReview } from "../model/IReview";
import { AccessCode } from "../service/accessCode";

const reviewService = new ReviewService();
const accessCodeService = new AccessCode();

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
    req: Request<{}, {}, { reviewId: string, answers: {questionId: string, answer: string}[]}>,
    res: Response<String>
) => {
    try {
        if(req.session.accessCode !== undefined) {
            if(!await accessCodeService.checkCodeStatus(req.session.accessCode)) {
                await reviewService.submitReview(req.body.reviewId, req.body.answers);
                await accessCodeService.setCodeUsed(req.session.accessCode);
                res.status(200).send("Answers to review successfully submitted.");
            } else {
                res.status(400).send("Could not submit answers");
            }
        } else {
            res.status(400).send("Could not submit answers");
        }
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
        if(response) {
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
    res: Response<{questionId: string, answer: string}[][]>
) => {
    try {
        const response = await reviewService.getIndividualAnswers(req.params.reviewID);
        if(response) {
            res.status(200).send(response);
        } else {
            res.status(404).send()
        }
        
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});