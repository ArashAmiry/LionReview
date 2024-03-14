import { accountModel } from "../../db/account.db";

export class LogInManager {

    async logIn(username: string, password: string): Promise<{username: string, success: Boolean}> {
        try {
            const acc = await this.getHashForUsername(username);
            const hash: string = acc.hashPassword;
            const success: Boolean = await this.validatePassword(password, hash)
            return {username: acc.username, success: success};
        }
        catch(error) {
            console.log(error)
            return {username: "error", success: false};
        } 
    }

    validatePassword(password: string, hash: string): Boolean {
        const bcrypt = require("bcrypt");
        return bcrypt
            .compare(password, hash)
            .catch((err: Error) => console.error(err.message));
    }

    async getHashForUsername(user: string): Promise<{username: string, hashPassword: string}> {

        // TODO: Get hash for username's password in database
        const account = await accountModel.findOne({ 
            $or: [
              { username: user }, // Check if the string matches the username
              { email: user }     // Check if the string matches the email
            ]
          }).exec();
        if (account) {
            return {username: account.username, hashPassword: account.password};
        } else {
            throw new Error('User not found');
        }

    }
}