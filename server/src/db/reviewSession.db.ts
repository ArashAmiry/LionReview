import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { IReviewSession } from "../model/IReviewSession";

const reviewSessionSchema: Schema = new Schema({

    username: {
        type: String,
        required: true,
    },
    
 // Alternative: break to more schemas and use them here instead.
    codePreviews: {
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

                questions: {
                    type: [String],
                    required: true,
                }
            }
        ]
    }
});


// Custom validation function to limit array length
function arrayLimit(val: any[]) {
    return val.length >= 1 && val.length <= 2;
}


export const reviewSessionModel = conn.model<IReviewSession>("ReviewSession", reviewSessionSchema);


