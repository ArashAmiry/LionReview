import { accessModel } from "../db/accessCode.db";
import { answerModel } from "../db/answer.db";
import { reviewModel } from "../db/review";
import { IReview } from "../model/IReview";
import { SendEmail } from "./SendEmail";

export class ReviewService {
    async createReview(review: Omit<IReview, 'createdBy'>, createdBy: string): Promise<String> {
        const newReview = await reviewModel.create({
            name: review.name,
            createdBy: createdBy,
            pages: review.pages,
            status: review.status,
            randomize: review.randomize
        });
        return newReview._id.toString()
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

    async getReview(reviewId: string): Promise<IReview | undefined> {
        try {
            const review = await reviewModel.findOne({ _id: reviewId }).exec();
            if (review !== null) { // since findById returns null if no document is found
                return review.toObject();
            }
        } catch (error) {
            console.error('An error occurred while fetching the review:', error);
            // Handle the error appropriately
        }

        throw new Error("No review was found with id: " + reviewId);
    }

    async submitReview(reviewId: string, answers: { questionId: string, answer: string }[]) {
        try {
            await answerModel.create({
                reviewId: reviewId,
                answers: answers
            })
        } catch (error) {
            console.error('An error occured while updating the database: ', error);
            throw new Error('An error occured while updating the database: ' + error);
        }
    }

    async getAnswers(questionId: string): Promise<string[] | undefined> {
        try {
            const results = await answerModel.find({ 'answers.questionId': questionId }).exec();

            if (results.length > 0) {
                const answers: string[] = results.flatMap(result => result.answers
                    .filter(answer => answer.questionId.toString() === questionId)
                    .map(answer => answer.answer)
                );
                return answers;
            } else {
                console.log("Could not find question with questionID: " + questionId);
            }
        } catch (error) {
            console.log("Error occured when fetching answers", error);
            throw error;
        }
    }

    async getIndividualAnswers(reviewId: string) {
        try {
            const results = await answerModel.find({ 'reviewId': reviewId }).exec();

            if (results.length > 0) {
                const individualAnswers = results.map(result => 
                    result.answers.map(answerObj => ({
                        questionId: answerObj.questionId.toString(),
                        answer: answerObj.answer
                    }))
                );
                return individualAnswers;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteReview(reviewID: string) : Promise<Boolean | undefined>{
        try{
            const results = await reviewModel.findByIdAndDelete(reviewID).exec();

            return results != null;

        } catch (error){
            console.log(error);
            return false;
        }
    }

    async distributeReview(emails: string[], reviewID: string) {
        const sendEmail = new SendEmail();
        sendEmail.sendReviewEmail(emails, reviewID);
    }

    async completeReview(reviewID: string) : Promise<Boolean>{
        try{
            const results = await reviewModel.findByIdAndUpdate( {_id: reviewID }, {status: "Completed"}).exec();
            const inactivatedAnswers = await accessModel.updateMany({reviewId: reviewID}, {completed: true}).exec();
            return (results != null && inactivatedAnswers != null);
        } catch (error){
            console.log(error);
            return false;
        }
    }
}