import { accountModel } from "../../db/account.db";

export class LogInManager {

    async logIn(username: string, password: string): Promise<Boolean> {

        const hash: string = await this.getHashForUsername(username);

        return this.validatePassword(password, hash);
    }

    validatePassword(password: string, hash: string): Boolean {
        const bcrypt = require("bcrypt");
        return bcrypt
            .compare(password, hash)
            .catch((err: Error) => console.error(err.message));
    }

    async getHashForUsername(username: string): Promise<string> {

        // TODO: Get hash for username's password in database
        const account = await accountModel.findOne({ username: username }).exec();
        if (account) {
            return account.password;
        } else {
            throw new Error('User not found');
        }

    }
}