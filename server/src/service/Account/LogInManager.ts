import { accountModel } from "../../db/account.db";
import { IAccount } from "../../model/IAccount";

export class LogInManager {

    async logIn(username: string, password: string): Promise<Boolean> {
        try {
            const acc = await this.getAccountForUsername(username);
            const hash: string = acc.password;
            return (await this.validatePassword(password, hash))/*  && acc.active */;
        }
        catch (error) {
            console.log(error)
            return false
        };
    }

    validatePassword(password: string, hash: string): Boolean {
        const bcrypt = require("bcrypt");
        return bcrypt
            .compare(password, hash)
            .catch((err: Error) => console.error(err.message));
    }

    async getAccountForUsername(user: string): Promise<IAccount> {

        // TODO: Get hash for username's password in database
        const account = await accountModel.findOne({
            $or: [
                { username: user }, // Check if the string matches the username
                { email: user }     // Check if the string matches the email
            ]
        }).exec();
        if (account) {
            return account;
        } else {
            throw new Error('User not found');
        }

    }
}