import { answerModel } from "../db/answer.db";
import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";

export class ReviewService {
    async createReview(review: IReview) {
        reviewModel.create({
            username: review.username,
            review: review.review
        });
    }
    
    async submitReview(questionId: string, answer: string) {
        try {
            const answers = await this.getAnswers(questionId) ?? [];

            const result = await answerModel.findOneAndUpdate(
                { questionId: questionId },
                {
                    answers: [...answers, answer]
                },
                {
                    upsert: true,
                    new: true
                }).exec();

            console.log(result);
        } catch (error) {
            console.error('An error occured while updating the database: ', error);
            throw new Error('An error occured while updating the database: ' + error);
        }
    }

    private async getAnswers(questionId: string): Promise<string[] | undefined> {
        try {
            const result = await answerModel.findOne({ questionId: questionId }).exec();

            if (result) {
                return result.answers
            } else {
                console.log("Could not find question with questionID: " + questionId);
            }
        } catch (error) {
            console.log("Error occured when fetching answers", error);
        }

    }
}