import express from "express";
import cors from "cors";
import { sessionRouter } from "./router/session";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/", sessionRouter);