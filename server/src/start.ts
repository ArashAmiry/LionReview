import express from "express";
import cors from "cors";
import { authenticationRouter } from "./router/authentication";
import session from "express-session";
import { createReviewRouter } from "./router/createReview";

export const app = express();


app.use(session({
    secret: "Your secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use("/create", createReviewRouter);
app.use("/auth", authenticationRouter);