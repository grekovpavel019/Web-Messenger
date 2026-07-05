import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "greklomabgtu@mail.ru",
        pass: "P5cKA3hRmEYGSAC4IPiN"
    }
});

export default transporter;