import { Schema } from "mongoose";
import { conn } from "./conn";
import { ObjectId } from "mongodb";
import { IAnswer } from "../model/IAnswer";

const answerSchema: Schema = new Schema({
    reviewId: { type: ObjectId },
    answers: {
        type: [{
            questionId: {
                type: ObjectId,
                ref: 'Review.questions',
                required: true
            },
            answer: {
                type: String,
            }
        }],
        validate: {
            validator: function(answers: {answer: string}[]) {
                console.log(answers);
                // Check that there is at least one non-empty answer
                return answers.some(answer => answer.answer.trim().length > 0);
            },
            message: 'You have to answer at least 1 question.'
        }
    }
    /////
});

export const answerModel = conn.model<IAnswer>("AnswerNisse", answerSchema);