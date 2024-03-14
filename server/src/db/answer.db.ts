import { Schema } from "mongoose";
import { conn } from "./conn";
import { ObjectId } from "mongodb";
import { IAnswer } from "../model/IAnswer";


const answerSchema: Schema = new Schema({

    questionId: {
        type: ObjectId,
        ref: 'Review.questions',
        required: true
    },

    answers: {
        type: [String],
        required: true
    }
});

export const answerModel = conn.model<IAnswer>("Answer", answerSchema);