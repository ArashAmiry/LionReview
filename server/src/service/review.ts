import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";

export class ReviewService {
    async createReview(review: IReview) {
        reviewModel.create({
            name: review.name,
            createdBy: review.createdBy,
            pages: review.pages
        });
    }

    async getReviews(username: string) {
        try {
            const reviews = await reviewModel.find({ createdBy: username }).exec();
            return reviews;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

}