import UserRepository from "../persistence/daos/repository/user.repository.js";
const userDao = new UserRepository();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const user = await userDao.getUserByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.createUser(req.body);
        return done(null, newUser);

    } catch (error) {
        console.log('---->', error);
    }
};

const login = async (req, email, password, done) => {
    const user = { email, password };
    const userLogin = await userDao.loginUser(user);
    if (!userLogin) return done(null, false);
    return done(null, userLogin);
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getUserById(id);
    return done(null, user);
});

export const frontResponse = {
    failureRedirect: '/api/profile',
    successRedirect: '/api/profile',
    passReqToCallback: true,
}