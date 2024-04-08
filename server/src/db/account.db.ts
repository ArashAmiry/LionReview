import { Schema, Model } from "mongoose";
import { IAccount } from "../model/IAccount";
import { conn } from "./conn";

const accountSchema: Schema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Index for TTL (Time To Live) for documents with active: false
accountSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { active: false } });

export const accountModel = conn.model<IAccount>("Account", accountSchema);