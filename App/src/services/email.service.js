import { createTransport } from "nodemailer";
import config from "../../config.js";

console.log(config.API_KEY_NODEMAILER)

export const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'lucaseramos13@gmail.com',
        password: config.API_KEY_NODEMAILER
    },
});