import { IAccount } from "../../model/IAccount";
import { FieldInfo } from 'mysql';

const mysql = require('mysql');

export class LogInManager {

    logIn(username: string, password: string): Boolean {

        const bcrypt = require("bcrypt");
        const saltRounds = 10;

        bcrypt
            .hash(password, saltRounds)
            .then((hash: string) => {
                console.log('Hash ', hash);
                return this.validateUser(username, hash);
            })
            .catch((err: Error) => {
                console.error(err.message)
            });

        return false;
    }

    validateUser(username: string, hash: string): Boolean {
        const bcrypt = require("bcrypt");
        const saltRounds = 10;

        bcrypt
                    .compare("$2b$10$vSJqYblImqfrhZoVV7f4QufRfxoInghhueiN2sT8U5oOsapjT1oOq", hash)
                    .then((res: Boolean) => {
                        console.log(res) // return true
                    })
                    .catch((err: Error) => console.error(err.message));

        /* const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodelogin'
        }); */

       /*  connection.query('SELECT * FROM accounts WHERE username = ?', [username], function (error: Error, results: IAccount[]) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length == 1) {
                // Authenticate the user
                const resultPassword = results[0].password;

                bcrypt
                    .compare(resultPassword, hash)
                    .then((res: Boolean) => {
                        console.log(res) // return true
                    })
                    .catch((err: Error) => console.error(err.message));
                // Redirect to home page
                return true;

            } else {
                console.log("Incorrect username or password");
                return false;
            }
        }); */

        return false;
    }
}