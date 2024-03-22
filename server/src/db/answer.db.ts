import { Schema } from "mongoose";
import { conn } from "./conn";
import { ObjectId } from "mongodb";
import { IAnswer } from "../model/IAnswer";

const answerSchema: Schema = new Schema({
    reviewId: { type: ObjectId },
    answers: [{
        questionId: {
            type: ObjectId,
            ref: 'Review.questions',
            required: true
        },
    
        answer: {
            type: String,
            required: true
        }
    }]
});

export const answerModel = conn.model<IAnswer>("AnswerNisse", answerSchema);