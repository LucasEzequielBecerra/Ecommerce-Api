import { Router } from "express";
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import userRouter from './user.router.js'
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { testLogger } from "../utils/logger.util.js";

const router = new Router()

router.use('/products', isLoggedIn, productRouter);
router.use('/carts', isLoggedIn, cartRouter);
router.use('/users', userRouter);
router.get('/loggerTest', (req, res) => {
    testLogger()
    res.json({ message: 'mira la consola' })
})

export default router;