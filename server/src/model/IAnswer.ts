import { Schema } from "mongoose";

export interface IAnswer {
    reviewId: Schema.Types.ObjectId;
    answers: [{
        questionId: Schema.Types.ObjectId;
        answer: string;
    }];
}