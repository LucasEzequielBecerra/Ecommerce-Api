import { Router } from 'express'
import { registerResponse, loginResponse, githubResponse, createUsersMock, restorePasswordController, changeRoleController, uploadDocumentsController, logoutUserController, getUsersController, deleteDisconnectedUsersControler } from '../controllers/user.controller.js'
const router = new Router();
import passport from 'passport';
import { sendGmailController } from '../controllers/email.controller.js';
import { uploader } from '../middlewares/multer.js';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from "../middlewares/auth.js";

router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse);
router.get('/', isAdmin, getUsersController)
router.post('/logout', logoutUserController)
router.delete('/clear-users', deleteDisconnectedUsersControler)

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse)

router.post('/users-mocks', createUsersMock)

router.post('/forgot-password', sendGmailController)
router.post('/restore-password', restorePasswordController)
router.post('/premium/:uid', isLoggedIn, changeRoleController)
router.post('/:uid/documents', uploader.any(), isLoggedIn, uploadDocumentsController)

export default router;


