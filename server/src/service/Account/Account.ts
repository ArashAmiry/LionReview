import { LogInManager } from "./LogInManager";
import { SignUpManager } from "./SignUpManager";

export class Account {

    private signUpManager = new SignUpManager();
    private logInManager = new LogInManager();

    signUp(username: string, password: string, email: string) : Boolean{
        return this.signUpManager.signUp(username, password, email);
    }

    logIn(username: string, password: string) : Boolean {
        console.log("account" + this.logInManager.logIn(username, password))
        return this.logInManager.logIn(username, password);
    }
}