import { Schema } from "mongoose";

export interface IAnswer {
    reviewId: Schema.Types.ObjectId;
    answer: string;
}