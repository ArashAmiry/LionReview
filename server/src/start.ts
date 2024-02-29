import express from "express";
import cors from "cors";
import { router } from "./router/authentication";
import session from "express-session";

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
app.use(cors());
app.use("/", router);