import * as services from '../services/user.service.js'

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


