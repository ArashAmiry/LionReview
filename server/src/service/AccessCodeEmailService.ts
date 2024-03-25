import * as nodeMailer from 'nodemailer';
import EMAIL_PASSWORD from './email_password';

export class AccessCodeEmailService {
    private transporter: nodeMailer.Transporter;

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'noreply.reviewtool@gmail.com',
                pass: EMAIL_PASSWORD
            }
        });
    }

    async sendAccessCode(email: string, accessCode: string): Promise<void> {
        const html = `
            <h1>Access Code</h1>
            <p>Your one-time access code is: ${accessCode}</p>
        `;
        await this.sendEmail(email, 'Your One-Time Access Code', html);
    }

    private async sendEmail(to: string, subject: string, html: string): Promise<void> {
        const info = await this.transporter.sendMail({
            from: 'ReviewTool <noreply.reviewtool@gmail.com>',
            to: to,
            subject: subject,
            html: html
        });

        console.log("Message sent: " + info.messageId);
    }
}
