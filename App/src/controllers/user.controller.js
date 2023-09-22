import * as services from '../services/user.service.js'
import { HttpResponse } from '../utils/http.response.util.js';
import { logger } from '../utils/logger.util.js';


export const registerResponse = (req, res, next) => {
    try {
        return HttpResponse.Ok(res, 'user registration successful')
    } catch (error) {
        next(error.message);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport?.user);
        if (user) return HttpResponse.Ok(res, user, `Welcome ${user.name}`)
        else return HttpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.user._id)
        if (user) return HttpResponse.Ok(res, user, `Welcome ${user.name}`)
        else return HttpResponse.NotFound(res, 'User not found')
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
                if (!err) return HttpResponse.Ok(res, user)
                else return HttpResponse.ServerError(res, 'Error logging out')
            });
        }
        else return HttpResponse.NotFound(res, 'User not found')
    } catch (error) {
        next(error.message)
    }
}

export const getUsersController = async (req, res, next) => {
    try {
        const users = await services.getUsersService()
        if (users) return HttpResponse.Ok(res, users)
        else return HttpResponse.NotFound(res, 'Users not found')
    } catch (error) {
        next(error.message);
    }
}

export const deleteDisconnectedUsersControler = async (req, res, next) => {
    try {
        const users = await services.deleteDisconnectedUsersService()
        res.json(users)
    } catch (error) {
        next(error.message)
    }
}

export const restorePasswordController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await services.restorePasswordService(email, password)
        res.json(user)
    } catch (error) {
        next(error.message);
    }
}

export const uploadDocumentsController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const file = req.files.map((file) =>
        ({
            name: file.originalname,
            reference: file.fieldname,
        }))
        const upl = await services.uploadDocumentsService(uid, file)
        res.json(upl)
    } catch (error) {
        next(error.message)
    }
}

export const changeRoleController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const user = await services.changeRoleService(uid)
        if (user.role === 'admin') res.json({ message: 'this is admin, your role has not been changed' })
        res.json({ message: 'your role has been changed' })
    } catch (error) {
        next(error.message);
    }
}


