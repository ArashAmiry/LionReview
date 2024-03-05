import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";

export class ReviewService {
    async createReview(review: IReview) {
        console.log(review.review[0].questions);
        reviewModel.create({
            username: review.username,
            review: review.review
        });
    }

}