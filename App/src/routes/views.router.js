import { Router } from 'express'
import UserDao from '../daos/mongodb/user.dao.js';
const router = new Router();

const userDao = new UserDao();

router.get('/', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/profile', async (req, res) => {
    const user = await userDao.getUserById(req.session.passport?.user);
    if (user) res.render('profile', { user })
    else res.json({ msg: 'la sesion ha expirado' })
})

export default router