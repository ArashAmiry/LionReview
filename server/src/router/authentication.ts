import express, { Request, Response } from "express";
import { Account } from "../service/Account/Account";
import { IAccount } from "../model/IAccount";
import { IAccountService } from "../service/Account/IAccountService";
import { SendEmail } from "../service/SendEmail";
import { accountModel } from "../db/account.db";
import { TokenHandler } from "../service/TokenHandler";

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
        if (typeof (req.body.username) !== "string" || typeof (req.body.password) !== "string"
            || req.body.username === "" || req.body.password === "") {
            res.status(400).send("Invalid username or password")
        }
        const user = req.body.username;
        const password = req.body.password;

        if (!await account.logIn(user, password)) {
            res.status(401).send("Could not log in.");
            return;
        }
        
        const acc = await accountModel.findOne({
            $or: [
                { username: req.body.username }, // Check if the entered username matches the username
                { email: req.body.username }     // Check if the entered username matches the email
            ]
        }).exec();
        if (acc) {
            req.session.user = acc.username;
            console.log(req.session)
            req.session.save();
            res.status(200).send("Successfully logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

authenticationRouter.get("/:token", async (
    req: Request<{token : string}, {}, {}>,
    res: Response
) => {
    const tok = req.params.token;
    if (!tok) {
        return res.status(400).send('Token is missing');
    }
    
    try {
        const tokenHandler = new TokenHandler();
        const decodedUsername = tokenHandler.decodeToken(tok);
        await accountModel.findOneAndUpdate({ username: decodedUsername }, { active: true });
        return res.redirect('http://localhost:3000/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error activating account');
    }
});