import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";

export class ReviewService {
    async createReview(review: IReview) {
        reviewModel.create({
            username: review.username,
            review: review.review
        });
    }

    async getReviews(username: string) {
        try {
            const reviews = await reviewModel.find({ username: username }).exec();
            return reviews;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

}