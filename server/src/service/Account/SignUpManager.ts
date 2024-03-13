import { accountModel } from "../../db/account.db";

export class SignUpManager {

    async signUp(username: string, password: string, email: string): Promise<Boolean> {
        if (!await this.validateUserNameAndEmail(username, email)) {
            return false;
        }
        const bcrypt = require("bcrypt");
        const saltRounds = 10;
        return await bcrypt
            .hash(password, saltRounds)
            .then((hash: string) => {
                console.log('Hash ', hash);
                // Save username, email and hash in database 
                accountModel.create({
                    username: username,
                    email: email,
                    password: hash

                });
                return true;
            })
            .catch((err: Error) => {
                console.error(err.message);
                return false;
            });

    }

    async validateUserNameAndEmail(username: string, email: string): Promise<Boolean | undefined> {
        // TODO: Validate the new username and email, should not exist in database
        if (await accountModel.findOne({ username: username }).exec()) {
            console.log("Username already exists");
            return false;
        }
        if (await accountModel.findOne({ email: email }).exec()) {
            console.log("Email already exists");
            return false;
        }
        return true;
    }
}