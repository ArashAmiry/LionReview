export class SignUpManager {

     signUp(username: string, password: string, email: string): Boolean {

        if (!this.validateUserNameAndEmail(username, email)) {
            return false;
        }

        const bcrypt = require("bcrypt");
            const saltRounds = 10;

            return bcrypt
                .hash(password, saltRounds)
                .then((hash: string) => {
                    console.log('Hash ', hash);
                    // Save username, email and hash in database 
                })
                .catch((err: Error) => console.error(err.message));
       
    }

    validateUserNameAndEmail(username: string, email: string): Boolean {
        // TODO: Validate the new username and email, should not exist in database
        return true;
    }
}