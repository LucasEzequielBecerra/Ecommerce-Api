import * as services from '../services/user.service.js'
import { UserModel } from '../persistence/daos/mongodb/models/user.model.js';
import { generateUser } from '../utils/faker.users.util.js';
import { logger } from '../utils/logger.util.js';


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

export const getUsersController = async (req, res, next) => {
    try {
        const users = await services.getUsersService()
        res.json(users)
    } catch (error) {
        next(error);
        logger.error('controller error: ')
    }
}

export const deleteDisconnectedUsersControler = async (req, res, next) => {
    try {
        const users = await services.deleteDisconnectedUsersService()
        res.json(users)
    } catch (error) {
        next(error)
    }
}

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
        const user = await services.getUserByIdService(req.session.passport?.user);
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

export const logoutUserController = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport?.user);
        if (user) {
            await services.logoutUserService(req.session.passport.user)
            req.session.destroy((err) => {
                if (!err) res.json({ message: 'Session: logout' });
                else res.send({ status: 'Logout ERROR', body: err });
            });
        }
        else throw new Error('there is not session started')
    } catch (error) {
        next(error)
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
        next(error)
    }
}

