import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "./mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1eb70a09b2394b",
    pass: "95ce1322d40549"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Jonathan Amarante <jonathan.almeida1793@gmail.com>",
      subject,
      html: body
    });
  }
}