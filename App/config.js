import 'dotenv/config'

export default {
    PORT: process.env.PORT,
    MONGODB_URL_STRING_CONNECTION: process.env.MONGODB_URL_STRING_CONNECTION,
    ENV: process.env.ENV,
    API_KEY_NODEMAILER: process.env.API_KEY_NODEMAILER,
    EMAIL_HOST: process.env.EMAIL_HOST,

}