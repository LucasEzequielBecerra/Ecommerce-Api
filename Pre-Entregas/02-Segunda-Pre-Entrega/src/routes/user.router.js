import { Router } from 'express'
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();
const router = new Router();

router.post('/register', async (req, res) => {
    try {
        const newUser = await userDao.createUser(req.body)
        if (newUser) res.redirect('/api/views');
        else res.json({ error: " register failed " })
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userDao.loginUser(req.body)
        console.log(user)
        if (user) {
            req.session.email = email
            req.session.password = password
            res.redirect('/api/products')
        } else {
            res.json({ error: " login failed " })
        }
    } catch (error) {

    }
})
export default router;


