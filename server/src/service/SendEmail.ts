import * as nodeMailer from 'nodemailer';
import EMAIL_PASSWORD from './email_password';
export class SendEmail {

    async sendEmail(email: string) {
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
            from: 'ReviewTool <noreply.reviewtool@gmail.com>', //The email address of the sender.
            // All email addresses can be plain ‘sender@server.com’ or formatted 
            //'“Sender Name” sender@server.com', see Address object for details
            to: 'anton.boras1@gmail.com',
            subject: 'test test test', // Typ "You have a review to do"
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }

    
}