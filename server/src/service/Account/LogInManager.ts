export class LogInManager {

    logIn(username: string, password: string): Boolean {

        const hash : string = this.getHashForUsername(username);
        
        return this.validatePassword(password, hash);
    }

    validatePassword(password: string, hash : string): Boolean {
        const bcrypt = require("bcrypt");
        return bcrypt
                    .compare("arash", "$2b$10$HfV66Cdp9Q2LsR9ipIcwzuioo8zTshQBQSIVGIkOW0AS2Ssn7RdEi")
                    .catch((err: Error) => console.error(err.message));
    }

    getHashForUsername(username: string): string {
        const passwordHash : string = "hej";
        
        // TODO: Get hash for username's password in database

        return passwordHash;
    }
}