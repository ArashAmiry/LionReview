import { reviewModel } from "../db/reviewSession.db";
import { IReviewSession } from "../model/IReviewSession";

export class ReviewService {
    async createReview(review: IReviewSession) {
        reviewModel.create(
            
        )
    }

}