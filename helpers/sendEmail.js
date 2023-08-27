import nodemailer from"nodemailer";

const { MAIL_ADDRESS, EMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: MAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {
    const email = {...data,  from: MAIL_ADDRESS};
    return transport.sendMail(email);
};

export default sendEmail;