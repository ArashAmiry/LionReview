import { answerModel } from "../db/answer.db";
import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";
import { AccessCode } from "../db/access.db";
import { AccessManager } from "./accessCodeService";

export class ReviewService {
    async createReview(review: Omit<IReview, 'createdBy'>, createdBy: string) {
        reviewModel.create({
            name: review.name,
            createdBy: createdBy,
            pages: review.pages
        });
    }
//se till att få in koden och checka här
    async getReviews(username: string) {
        try {
            const reviews = await reviewModel.find({ createdBy: username }).exec();
            return reviews;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }
//distribute reviews.... använd denna (finns egentligen en router men denna används som )
    async getReview(reviewId: string): Promise<IReview | undefined> {
        try {
            const review = await reviewModel.findOne({ _id: reviewId }).exec();
            //jag vet inte ifall den ska vara i routern men ska iaf va en query grej som länkar till rätt review 
            //och den ska checkas någonstans här så man kan validera att användaren har rätt kod.
            if (review !== null) { // since findById returns null if no document is found
                return review.toObject();
            }
        } catch (error) {
            console.error('An error occurred while fetching the review:', error);
            // Handle the error appropriately
        }

        throw new Error("No review was found with id: " + reviewId);
    }

    ///uppdatera boolean 
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
            //behöver koppla en grej som uppdaterar boolean till false after submit här. 
            //vet inte hur denna ska se ut. 
            await AccessCode.findOneAndUpdate(/*ha ngt som kollar koden,*/{completed : true});
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