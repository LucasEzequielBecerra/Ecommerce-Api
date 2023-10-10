import { createTransport } from "nodemailer";
import config from "../../config.js";

export const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: false,
    auth: {
        user: config.EMAIL_HOST,
        pass: config.API_KEY_NODEMAILER
    },
    tls: {
        rejectUnauthorized: false
    }
});