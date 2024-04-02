import { accountModel } from "../../db/account.db";
import { IAccount } from "../../model/IAccount";
import { IAccountService } from "./IAccountService";
import { LogInManager } from "./LogInManager";
import { SignUpManager } from "./SignUpManager";

export class Account implements IAccountService{

    private signUpManager = new SignUpManager();
    private logInManager = new LogInManager();

    async getAccounts(): Promise<IAccount[]> {
        return await accountModel.find();
    }

    async signUp(username: string, password: string, email: string) : Promise<Boolean> {
        return await this.signUpManager.signUp(username, password, email);
    }

    async logIn(username: string, password: string) : Promise<Boolean> {
        console.log("account" + this.logInManager.logIn(username, password))
        return await this.logInManager.logIn(username, password);
    }

    async usernameExists(username: string) : Promise<Boolean> {
        return (await accountModel.find({ username: username }).exec()).length > 0;
    }

    async emailExists(email: string) : Promise<Boolean> {
        return (await accountModel.find({ email: email }).exec()).length > 0;
    }
}