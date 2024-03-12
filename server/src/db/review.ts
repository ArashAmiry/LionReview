import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { IReview } from "../model/IReview";

const reviewSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    createdBy: {
        type: String,
        required: true,
    },
    
    pages: {
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
                    questionType: {
                        type: String,
                        enum: ['binary', 'range', 'text'],
                        required: true
                    },
                    question: {
                        type: String,
                        required: true
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


export const reviewModel = conn.model<IReview>("Review", reviewSchema);


