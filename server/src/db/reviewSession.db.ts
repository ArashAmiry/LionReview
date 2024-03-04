import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { IReviewSession } from "../model/IReviewSession";

const reviewSessionSchema: Schema = new Schema({

    username: {
        type: String,
        required: true,
    },
    
    review: {
        type: [
            {
                formName: {
                    type: String,
                    required: true
                },

                codeSegments: {
                    type: [{
                        filename: {
                            type: String,
                            required: true
                        },
                        content: {
                            type: String,
                            required: true
                        }
                    }],
                    validate: [arrayLimit, '{PATH} exceeds the limit of 2'], // Custom validator
                },

                questions: [{
                    type: {
                        type: String,
                        enum: ['binary', 'scale', 'text'],
                        required: true
                    },
                    question: {
                        type: String,
                        required: true
                    },
                    scaleRange: { // How to validate? (Type must be scale if scaleRange has a value)
                        type: Number,
                        default: 5,
                    }
                }]
            }
        ]
    }
});


// Custom validation function to limit array length
function arrayLimit(val: any[]) {
    return val.length >= 1 && val.length <= 2;
}


export const reviewModel = conn.model<IReviewSession>("ReviewSession", reviewSessionSchema);


