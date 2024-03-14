import { Schema } from "mongoose";

export interface IAnswer {
    questionId: Schema.Types.ObjectId;
    answers: string[];
}