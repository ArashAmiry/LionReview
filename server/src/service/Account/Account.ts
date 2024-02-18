import { SignUpManager } from "./SignUpManager";

export class Account {

    private signUpManager = new SignUpManager();

    signUp(username: string, password: string, email: string) {
        return this.signUpManager.signUp(username, password, email);
    }

    logIn(username: string, password: string){
        
    }
}