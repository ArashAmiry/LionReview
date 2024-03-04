import express from "express";
import cors from "cors";
import { authenticationRouter } from "./router/authentication";
import session from "express-session";
import { fetchCodeRouter } from "./router/fetchCode";
import { reviewRouter } from "./router/review";

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
app.use("/fetch", fetchCodeRouter);
app.use("/review", reviewRouter);
app.use("/auth", authenticationRouter);