import { Router } from 'express'
import { registerResponse, loginResponse, githubResponse, logout, createUsersMock, restorePasswordController, changeRoleController, uploadDocumentsController } from '../controllers/user.controller.js'
const router = new Router();
import passport from 'passport';
import { sendGmailController } from '../controllers/email.controller.js';
import { uploader } from '../middlewares/multer.js';

router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse);
router.post('/logout', logout)

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)

router.post('/users-mocks', createUsersMock)

router.post('/forgot-password', sendGmailController)
router.post('/restore-password', restorePasswordController)
router.post('/premium/:uid', changeRoleController)
router.post('/:uid/documents', uploader.any(), uploadDocumentsController)

export default router;


