import { transporter } from '../services/email.service.js'
import config from '../../config.js'
import { logger } from '../utils/logger.util.js'
import { getUserByEmailService } from '../services/user.service.js'

export const sendGmailController = async (req, res) => {
    try {
        const { email } = req.body
        const user = await getUserByEmailService(email)
        if (!user) res.json({ error: 'email not registered' })
        const gmailOptions = {
            from: config.EMAIL_HOST,
            to: 'lucaseramos13@gmail.com',
            subject: 'Cambio de contraseña',
            html: `<h1>Hola ${user.name}, presiona en el siguiente link para reestablecer contraseña</h1>`
        }
        const response = await transporter.sendMail(gmailOptions)
        console.log('email sent')
        res.json(response)
    } catch (error) {
        console.log(error)
    }
}

