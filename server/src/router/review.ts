import express, { Request, Response } from "express";
import { ReviewService } from "../service/review";
import { IReview } from "../model/IReview";
import { AccessManager} from "../service/accessCodeService"

const reviewService = new ReviewService();
const verificationService = new AccessManager();

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
    req: Request<{  }, {}, {reviewId: string}>,
    res: Response<IReview>
) => {
    try {
        console.log("Hello")
        const review = await reviewService.getReview(req.body.reviewId);
        res.status(200).send(review);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

reviewRouter.post("/answer", async (
    req: Request<{}, {}, { questionId: string, answer: string }>,
    res: Response<String>
) => {
    try {
        await reviewService.submitReview(req.body.questionId, req.body.answer);
        res.status(200).send("Answers to review successfully submitted.");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

//detta var en fullösning enligt grabben som jag frågade om hur man gör webquerys igår
interface Foo {
    foo: string;
}


//denna kommer skicka vidare efter verify till review? 
reviewRouter.post("/auth/verify", async (
    req: Request<{}, {}, {accessCode: string}, Foo>, res: Response) => {
    try {
        const verified = await verificationService.verifyAccessCode(req.body.accessCode, req.query.foo);
        res.status(200).send(verified);
    }
    catch (e: any){
        res.status(500).send(e.message);
    }
});