import express from "express";
import cors from "cors";
import { router } from "./router/session";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);