import { Router } from 'express'
import UserDao from "../daos/mongodb/user.dao.js";
import { registerResponse, loginResponse, githubResponse, githubData } from '../controllers/users.controller.js'
const userDao = new UserDao();
const router = new Router();
import passport from 'passport';

router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login', passport.authenticate('login'), loginResponse);

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }), githubData)
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)
export default router;


