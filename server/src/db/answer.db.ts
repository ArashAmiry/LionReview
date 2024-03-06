import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { ObjectId } from "mongodb";


const answerSchema: Schema = new Schema({

    reviewID: {
        type: ObjectId,
        ref: 'Review'
    }
    
});

export const reviewModel = conn.model<IReview>("Answer", answerSchema);