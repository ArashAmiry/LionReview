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
        try {
            const review = await reviewModel.findOne({_id: reviewId}).exec();
            if (review !== null) { // since findById returns null if no document is found
                return review.toObject();
            }
        } catch (error) {
            console.error('An error occurred while fetching the review:', error);
            // Handle the error appropriately
        }
        
        throw new Error("No review was found with id: " + reviewId);
    }

}