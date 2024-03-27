import * as nodeMailer from 'nodemailer';
import EMAIL_PASSWORD from './email_password';
export class SendEmail {

    async sendReviewEmail(email: string) {
        const html = `
        <h1> Hello World </h1>
        `;
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com', // kanske fixa
            port: 465,
            secure: true,
            auth: {
                user: 'noreply.reviewtool@gmail.com', // fixa
                pass: EMAIL_PASSWORD // fixa 
            }
        });

        const info = await transporter.sendMail({
            from: 'ReviewTool <noreply.reviewtool@gmail.com>',
            to: 'anton.boras1@gmail.com',
            subject: 'You have a review to do',
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }

//kommer skicka en accesscode med en querylink till användaren som ska reviewa, behövs en sån för att
//databasen ska funka som jag tänkt med att man kan ha randomly genererade koder som kan va samma till flera reviews utan 
//att man ska oroa sig till vilken man kommer.
    async sendAccessCode(email: string, accessCode: string, reviewIDLink: string) {
        const html = `
            <h1>Access Code</h1>
            <p>Your one-time access code is: ${accessCode}.
            Click the following link to get to the website: ${reviewIDLink}</p>
        `;
        this.sendReviewEmail(email);
    }

    /*
    Skicka en 
    */
    async sendAuthenticationEmail(email: string, activationLink: string) {
    const html = `
        <h1> Hello World </h1>
        <p>Click the following link to activate your account:</p>
        <a href="${activationLink}">Activate Account</a>
    `;
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com', // kanske fixa
            port: 465,
            secure: true,
            auth: {
                user: 'noreply.reviewtool@gmail.com',
                pass: EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: 'ReviewTool <noreply.reviewtool@gmail.com>',
            to: 'anton.boras1@gmail.com',
            subject: 'Account activation',
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }

    
}