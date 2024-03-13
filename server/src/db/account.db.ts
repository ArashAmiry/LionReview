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

    }

});





export const accountModel = conn.model<IAccount>("Account", accountSchema);


