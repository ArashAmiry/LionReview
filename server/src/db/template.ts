import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { ITemplate } from "../model/ITemplate";

// Define the schema
const templateSchema: Schema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  /*category: {
    type: String,
    required: true
  },*/
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
  },
  questions: {
    type: [{
      questionType: { type: String, required: true },
      question: { type: String, required: true }
    }],
    validate: {
      validator: function (questions: { question: string }[]) {
        console.log(questions);
        // Check that there is at least one non-empty answer
        return questions.some(question => question.question.trim().length > 0);
      },
      message: 'You need at least 1 question.'
    }

  }
});


export const templateModel = conn.model<ITemplate>("Template", templateSchema);