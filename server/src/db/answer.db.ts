import { Schema } from "mongoose";
import { conn } from "./conn";
import { ObjectId } from "mongodb";
import { IAnswer } from "../model/IAnswer";


const answerSchema: Schema = new Schema({

    reviewID: {
        type: ObjectId,
        ref: 'Review'
    },

    question: {
        type: ObjectId,
        ref: 'Review.questions'
    },

    answer: {
        type: String,
        required: true
    }
});

export const reviewModel = conn.model<IAnswer>("Answer", answerSchema);