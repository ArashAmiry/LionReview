export class LogInManager {

    logIn(username: string, password: string): Boolean {

        const bcrypt = require("bcrypt");

        const hash : string = this.getHashForUsername(username);

        const bool : Boolean = bcrypt
                    .compare("arash", "$2b$10$HfV66Cdp9Q2LsR9ipIcwzuioo8zTshQBQSIVGIkOW0AS2Ssn7RdEi")
                    .then((res: Boolean) => {
                        console.log("manager " + res) // return true
                        return res
                    })
                    .catch((err: Error) => console.error(err.message));
        
        return bool;
    }



    getHashForUsername(username: string): string {
        const passwordHash : string = "hej";
        
        // TODO: Get hash for username's password in database

        return passwordHash;
    }
}