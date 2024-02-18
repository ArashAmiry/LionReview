export class SignUpManager {

     signUp(username: string, password: string, email: string): Boolean {

        if (true) { // Username and email validated with database
            const bcrypt = require("bcrypt");
            const saltRounds = 10;

            bcrypt
                .hash(password, saltRounds)
                .then((hash: string) => {
                    console.log('Hash ', hash);
                    // Save in database
                    return true;
                })
                .catch((err: Error) => console.error(err.message));

            return false;


        }
        
        return false;
    }
}