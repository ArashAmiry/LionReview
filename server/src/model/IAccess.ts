export interface IAccessCode extends Document{
    requestId: string;
    passcode: string;
    completed: boolean;
}



