import express, { Request, Response } from "express";
import { Account } from "../service/Account/Account";
import { IAccount } from "../model/IAccount";
import { SignUpManager } from "../service/Account/SignUpManager";


const account = new Account();

export const router = express.Router();

router.post("/signup", async (
    req: Request<{}, {}, IAccount>,
    res: Response<String>
) => {
    try {
        
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if (account.signUp(username, password, email)){
            res.status(200).send("Successfully signed up.");
        }
        else{
            res.status(400).send("Could not sign up.");
        }    

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

router.post("/login", async (
    req: Request<{}, {}, {username: string, password: string}>,
    res: Response<String>
) => {
    try {
        
        const username = req.body.username;
        const password = req.body.password;

        console.log("router " + account.logIn(username, password))

        if (account.logIn(username, password)){
            res.status(200).send(username);
        }
        else{
            res.status(400).send("Could not log in.");
        }    
        
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});