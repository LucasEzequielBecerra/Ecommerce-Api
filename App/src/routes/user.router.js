import { Router } from 'express'
import { registerResponse, loginResponse, githubResponse, logout, createUsersMock, restorePasswordController, changeRoleController } from '../controllers/user.controller.js'
const router = new Router();
import passport from 'passport';
import { sendGmailController } from '../controllers/email.controller.js';

router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse);
router.post('/logout', logout)

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)

router.post('/users-mocks', createUsersMock)

router.post('/forgot-password', sendGmailController)
router.post('/restore-password', restorePasswordController)
router.post('/premium/:uid', changeRoleController)

export default router;


