import * as services from '../services/user.service.js'
import { UserModel } from '../persistence/daos/mongodb/models/user.model.js';
import { generateUser } from '../utils/faker.users.util.js';
import { logger } from '../utils/logger.util.js';
import { uploader } from '../middlewares/multer.js';

export const createUsersMock = async (req, res, next) => {
    let cant = 50
    const { cantidad } = req.query
    if (cantidad) cant = cantidad
    const usersArray = []
    for (let i = 0; i < cant; i++) {
        const user = generateUser();
        usersArray.push(user);
    }
    const users = await UserModel.create(usersArray)
    res.json(users);
};

export const registerResponse = (req, res, next) => {
    try {
        res.json({ message: 'user registered' })
    } catch (error) {
        next(error);
        logger.error('controller error: ')
    }
};

export const restorePasswordController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await services.restorePasswordService(email, password)
        res.json(user)
    } catch (error) {
        logger.error('controller error:')
    }
}

export const changeRoleController = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await services.changeRoleService(uid)
        if (user.role === 'admin') res.json({ message: 'this is admin, your role has not been changed' })
        res.json({ message: 'your role has been changed' })
    } catch (error) {
        logger.error('controller error:')
    }
}

export const loginResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport.user);
        res.json({ message: `welcome ${user.name}`, userData: user })
    } catch (error) {
        next(error);
        logger.error('controller error: ')
    }
}


export const githubResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.user._id)
        res.json({ user })
    } catch (error) {
        next(error);
        logger.error('controller error: ')
    }
}

export const logout = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err) res.json({ message: 'sesion:logout' });
            else res.send({ status: 'Logout ERROR', body: err });
        });
    } catch (error) {
        next(error)
    }
}

export const uploadDocumentsController = async (req, res, next) => {
    try {
        console.log(req.files)
        const { uid } = req.params
        // const file = req.file
        // const upl = await services.uploadDocumentsService(uid, file)
        res.json(req.file)
    } catch (error) {
        next(error)
    }
}

