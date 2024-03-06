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

    async getReview(reviewId: string) : Promise<IReview | undefined> {
        const review = await reviewModel.findById(reviewId).exec();
        if (review !== undefined && review !== null){
            return review.toObject();
        }
        
        throw new Error("No review was found with id: " + reviewId);
    }

}