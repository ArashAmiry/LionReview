import { Account } from "./Account";
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

    validateUser(username: string, hash: string) : Boolean {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nodelogin'
        });

        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, hash], function (error: Error, results: Account[]) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length == 1) {
                // Authenticate the user
                // Redirect to home page
                return true;

            } else {
                console.log("Incorrect username or password");
                return false;
            }
        });

        return false;
    }
}