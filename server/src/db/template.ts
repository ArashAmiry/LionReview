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
  questions: [{
    questionType: { type: String, required: true },
    question: { type: String, required: true }
  }]
});


export const templateModel = conn.model<ITemplate>("Template", templateSchema);