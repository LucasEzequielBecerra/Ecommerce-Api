import { Router } from 'express'
import { registerResponse, loginResponse, githubResponse, logout } from '../controllers/users.controller.js'
const router = new Router();
import passport from 'passport';
import { frontResponse } from '../passport/local-passport.js';

router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login', frontResponse), loginResponse);
router.post('/logout', logout)

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)
export default router;


