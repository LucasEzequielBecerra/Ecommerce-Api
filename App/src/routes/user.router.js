import { Router } from 'express'
import * as controllers from '../controllers/user.controller.js'
const router = new Router;
import passport from 'passport';
import { uploader } from '../middlewares/multer.js';
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from "../middlewares/auth.js";

router.post('/register', passport.authenticate('register'), controllers.registerResponse);
router.post('/login', passport.authenticate('login', { failureFlash: true }), controllers.loginResponse);
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), controllers.githubResponse)


router.post('/logout', isLoggedIn, controllers.logoutUserController)


router.get('/list', isAdmin, controllers.getUsersController)
router.delete('/clear-users', isAdmin, controllers.deleteDisconnectedUsersController)


router.post('/forgot-password', controllers.sendMailToRecoverPassword)
router.post('/restore-password', controllers.restorePasswordController)
router.post('/:uid/documents', uploader.any(), isLoggedIn, controllers.uploadDocumentsController)
router.post('/premium/:uid', isLoggedIn, controllers.changeRoleController)

export default router;


