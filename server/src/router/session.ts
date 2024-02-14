import express, { Request, Response } from "express";
import { RepositoryService } from "../service/fetchCode";

const fetchCodeService = new RepositoryService();

export const sessionRouter = express.Router();

sessionRouter.get("/", async (
    req: Request<{}, {}, {}, {}>,
    res: Response<String>
) => {
    try {
        const fetchedCode = await fetchCodeService.fetchCode("https://github.com/ArashAmiry/Smasko/blob/mockup/server/src/router/recipe.ts");

        res.status(200).send(fetchedCode)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})