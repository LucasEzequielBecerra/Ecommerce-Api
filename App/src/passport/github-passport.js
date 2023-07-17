import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();
import passport from "passport"
import { Strategy as GithubStrategy } from "passport-github2";

const strategyOptions = {
    clientID: 'Iv1.402ae943c1966814',
    clientSecret: 'f38c80544fddf803a9d5d76ce6e257261387a156',
    callbackURL: 'http://localhost:8080/api/users/profile-github'
}

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email
    const user = await userDao.getUserByEmail(email)
    if (user) return done(null, user)
    const name = profile._json.name
    const newUser = await userDao.createUser({
        first_name: name.split(' ')[0],
        last_name: name.split(' ').length > 2 ? name.split(' ')[2] : name.split(' ')[1],
        email,
        password: '',
        isGithubUser: true
    })
    return done(null, newUser)
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));