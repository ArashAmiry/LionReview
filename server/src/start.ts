require("dotenv").config();
import express from "express";
import cors from "cors";
import { authenticationRouter } from "./router/authentication";
import { fetchCodeRouter } from "./router/fetchCode";
import { reviewRouter } from "./router/review";
import session from 'express-session';
import { templateRouter } from "./router/template";
import { accessCodeRouter } from "./router/accessCode";
const MongoStore = require('connect-mongo');


export const app = express();

const sessionStore = MongoStore.create({
    mongoUrl: `mongodb+srv://boras:${process.env.PASSWORD}@kandidat.1uyabje.mongodb.net/?retryWrites=true&w=majority&appName=Kandidat`,
    collectionName: 'sessions'
})

app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        sameSite: 'strict'
    }
}));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use("/fetch", fetchCodeRouter);
app.use("/review", reviewRouter);
app.use("/auth", authenticationRouter);
app.use("/template", templateRouter);
app.use("/access", accessCodeRouter)
