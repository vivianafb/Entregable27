// import Config from '../config';
// import nodemailer from 'nodemailer';
// import path from 'path';
// export class Gmail {
//    owner;
//    transporter;
//   constructor() {
//     this.owner = {
//       name: Config.GMAIL_NAME,
//       address: Config.GMAIL_EMAIL,
//     };
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: Config.GMAIL_EMAIL,
//         pass: Config.GMAIL_PASSWORD,
//       },
//     });
//     this.transporter.verify();
//   }
//   async sendEmail(dest, subject, content) {
//     const mailOptions = {
//       from: this.owner,
//       to: dest,
//       subject,
//       html: content,
//     //   attachments: [
//     //     {
//     //       // filename and content type is derived from path
//     //       path: path.resolve(__dirname, '../nodemailer.png'),
//     //     },
//     //   ],
//     };
//     const response = await this.transporter.sendMail(mailOptions);
//     return response;
//   }
// }
// export const GmailService = new Gmail();
"use strict";