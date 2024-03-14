import express from "express";
import cors from "cors";
import { authenticationRouter } from "./router/authentication";
import { fetchCodeRouter } from "./router/fetchCode";
import { reviewRouter } from "./router/review";
import session from 'express-session';
import SECRET from "./session_secret";
import PASSWORD from "./db/password";
const MongoStore = require('connect-mongo')

export const app = express();

const sessionStore = MongoStore.create({
    mongoUrl: `mongodb+srv://boras:${PASSWORD}@kandidat.1uyabje.mongodb.net/?retryWrites=true&w=majority&appName=Kandidat`,
    collectionName: 'sessions'
})

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
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