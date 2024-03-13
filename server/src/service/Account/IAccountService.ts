export interface IAccountService {
    signUp(username: string, password: string, email: string) : Promise<Boolean>

    logIn(username: string, password: string) : Promise<Boolean>
}