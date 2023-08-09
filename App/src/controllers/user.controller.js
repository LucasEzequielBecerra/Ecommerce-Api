import * as services from '../services/user.service.js'
import { UserModel } from '../persistence/daos/mongodb/models/user.model.js';
import { generateUser } from '../utils/faker.users.util.js';

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
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.session.passport.user);
        res.json({ message: `welcome ${user.name}`, userData: user })
    } catch (error) {
        next(error);
    }
}


export const githubResponse = async (req, res, next) => {
    try {
        const user = await services.getUserByIdService(req.user._id)
        res.json({ user })
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.json({ message: 'sesion:logout' });
        else res.send({ status: 'Logout ERROR', body: err });
    });
}


