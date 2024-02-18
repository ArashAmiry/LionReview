export class SignUpManager {

     signUp(username: string, password: string, email: string): Boolean {

        if (!true) { // Username and email falsly validated with database
            return false;
        }

        const bcrypt = require("bcrypt");
            const saltRounds = 10;

            return bcrypt
                .hash(password, saltRounds)
                .then((hash: string) => {
                    console.log('Hash ', hash);
                    // Save in database
                })
                .catch((err: Error) => console.error(err.message));
       
    }
}