import { Schema } from "mongoose";

export interface IAnswer {
    reviewId: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    answer: string;
}