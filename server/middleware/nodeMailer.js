import nodemailer from 'nodemailer';

export const sendMail = (email,subject, body, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "agrotradehelp@gmail.com",
            pass: "cldf skjh qtnq keyw",
        },
        secure: true,
    });
    const mailOptions = {
        from: 'agrotradehelp@gmail.com',
        to: email,
        subject: subject,
        text: body
    };
    transporter.sendMail(mailOptions);
    console.log('Mail Sended Successfully.');
}
