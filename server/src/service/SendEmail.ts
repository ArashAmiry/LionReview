import * as nodeMailer from 'nodemailer';
import EMAIL_PASSWORD from './email_password';
import { AccessCode } from './accessCode';
export class SendEmail {

    accessCodeService = new AccessCode()
    async sendReviewEmail(emails: string[], reviewID: string) {
        emails.forEach(async email => {
            const code = await this.accessCodeService.generateIndividualAccessCode(reviewID);
            const html = `
            <h3>Hello!</h3>
            <p>You've been invited to participate in a code review.</p>
            <p>To access the code review, kindly click <a href=${process.env.REACT_APP_CLIENT_URL}/answer/${reviewID}>here</a>.</p>
            <p>Additionally, here's your unique access code: ${code}. This code is valid for a single use.</p>            
                `;
            const transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com', // kanske fixa
                port: 465,
                secure: true,
                auth: {
                    user: 'noreply.reviewtool@gmail.com', // fixa
                    pass: process.env.EMAIL_PASSWORD // fixa 
                }
            });

            const info = await transporter.sendMail({
                from: 'ReviewTool <noreply.reviewtool@gmail.com>',
                to: email,
                subject: 'You have a code review to do',
                html: html
            })

            console.log("Message sent: " + info.messageId);
        });


    }


    /*
    Skicka en 
    */
    async sendAuthenticationEmail(email: string, activationLink: string) {
        const html = `
        <h1>Welcome to Our Community!</h1>
        <p>We're excited to have you join us. To activate your account and start using our application, please click the link below:</p>
        <p><a href="${activationLink}">Activate Account</a></p>
    `;
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com', // kanske fixa
            port: 465,
            secure: true,
            auth: {
                user: 'noreply.reviewtool@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: 'ReviewTool <noreply.reviewtool@gmail.com>',
            to: 'anton.boras1@gmail.com',
            subject: 'Activate Account',
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }


}