import express, { Request, Response } from "express";
import { Account } from "../service/Account/Account";
import { IAccount } from "../model/IAccount";
import { IAccountService } from "../service/Account/IAccountService";


const account: IAccountService = new Account();

export const authenticationRouter = express.Router();

authenticationRouter.post("/signUp", async (
    req: Request<{}, {}, IAccount>,
    res: Response<String>
) => {
    try {

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if (await account.signUp(username, password, email)) {
            res.status(200).send("Successfully signed up.");
        }
        else {
            res.status(400).send("Could not sign up.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

authenticationRouter.post("/logIn", async (
    req: Request<{}, {}, { username: string, password: string }>,
    res: Response<String>
) => {
    try {

        const user = req.body.username;
        const password = req.body.password;
        console.log("authenticationRouter " + await account.logIn(user, password))
        const login = await account.logIn(user, password);
        console.log(login)
        if (login.success) {
            //req.session.id = username;
            res.status(200).send(login.username);
        }
        else {
            res.status(401).send("Could not log in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});