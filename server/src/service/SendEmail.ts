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


    /*
    Skicka en 
    */
    async sendAuthenticationEmail(email: string) {
        const html = `
        <h1> Hello World </h1>
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
            to: email,
            subject: 'Account activation',
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }

    
}