import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
    try {
        res.redirect('/api')
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user);
        console.log('lol------------------->', user)
        res.json(user)
    } catch (error) {
        next(error);
    }
}


export const githubResponse = async (req, res, next) => {
    try {
        const user = await userDao.getUserById(req.user._id)
        res.render('profile', { user })
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.redirect('/');
        else res.send({ status: 'Logout ERROR', body: err });
    });
}


