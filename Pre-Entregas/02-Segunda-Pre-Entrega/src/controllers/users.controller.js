import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
    try {
        res.redirect('/')
    } catch (error) {
        next(error);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        // const user = await userDao.getUserById(req.session.passport.user);
        // const { first_name, last_name, email, age, role } = user;
        res.redirect('/api/products')
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        // const { first_name, last_name, email, role, isGithubUser } = req.user;
        res.redirect('/api/products')
    } catch (error) {
        next(error);
    }
}

export const githubData = async (req, res, next) => {
    try {
        const { first_name, last_name, email, role, isGithubUser } = req.user;
        res.json({
            msg: 'Register/Login Github OK',
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                role,
                isGithub
            }
        })
    } catch (error) {
        next(error)
    }
}