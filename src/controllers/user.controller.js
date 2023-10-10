import * as services from '../services/user.service.js'
import { transporter } from '../utils/email.util.js';
import config from '../../config.js';
import { HttpResponse } from '../utils/http.response.util.js';
const httpResponse = new HttpResponse()
import { logger } from '../utils/logger.util.js';


export const registerResponse = async (req, res, next) => {
    try {
        return httpResponse.Ok(res, 'Register ok')
    } catch (error) {
        next(error.message);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport?.user);
        if (user) return httpResponse.Ok(res, user, `Welcome ${user.name}`)
        else return httpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.user._id)
        if (user) return httpResponse.Ok(res, user, `Welcome ${user.name}`)
        else return httpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message);
    }
}

export const logoutUserController = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport?.user);
        if (user) {
            await services.logoutUserService(req.session.passport.user)
            req.session.destroy((err) => {
                if (!err) return httpResponse.Ok(res, user)
                else return httpResponse.ServerError(res, 'Error logging out')
            });
        }
        else return httpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message)
    }
}

export const getUsersController = async (req, res, next) => {
    try {
        const users = await services.getUsersService()
        if (users) return httpResponse.Ok(res, users)
        else return httpResponse.NotFound(res, 'Users not found')
    } catch (error) {
        next(error.message);
    }
}

export const deleteDisconnectedUsersController = async (req, res, next) => {
    try {
        const response = await services.deleteDisconnectedUsersService()
        if (response) return httpResponse.Ok(res, response)
        else return httpResponse.NotFound(res, 'Users not found')
    } catch (error) {
        next(error.message)
    }
}

export const sendMailToRecoverPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await services.getUserByEmailService(email)
        if (!user) res.json({ error: 'email not registered' })
        const gmailOptions = {
            from: config.EMAIL_HOST,
            to: email,
            subject: 'Cambio de contraseña',
            html: `<h1>Hola ${user.name}, presione el siguiente link para recuperar su contraseña</h1>`
        }
        const response = await transporter.sendMail(gmailOptions)
        if (response) return httpResponse.Ok(res, `The mail has sent to ${response.accepted}`)
        else return httpResponse.NotFound(res, 'Mail not sent')

    } catch (error) {
        next(error.message)
    }
}

export const restorePasswordController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const response = await services.restorePasswordService(email, password)
        if (response) return httpResponse.Ok(res, response)
        else return httpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message);
    }
}

export const uploadDocumentsController = async (req, res, next) => {
    try {
        console.log('wats')
        const { uid } = req.params
        const file = req.files.map((file) =>
        ({
            name: file.originalname,
            reference: file.fieldname,
        }))
        const user = await services.uploadDocumentsService(uid, file)
        if (user) return httpResponse.Ok(res, user.documents)
        else return httpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message)
    }
}

export const changeRoleController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const response = await services.changeRoleService(uid)
        if (response) return httpResponse.Ok(res, response)
        else return httpResponse.NotFound(res, 'Users not found')
    } catch (error) {
        next(error.message);
    }
}


