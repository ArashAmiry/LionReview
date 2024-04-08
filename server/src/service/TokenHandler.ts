import * as jwt from 'jsonwebtoken';
import TOKEN_KEY from './token_key';

export class TokenHandler {
    generateToken(username: string): string {
        //console.log(process.env.TOKEN_KEY)
        return jwt.sign({ username }, TOKEN_KEY, { expiresIn: "24h" });
    }
    
    decodeToken(token: string) {
        const decoded = jwt.verify(token, TOKEN_KEY)  as { username: string };
        return decoded.username;
    }
}

