import { Router } from "express";
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import userRouter from './user.router.js'
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = new Router()

router.use('/products', isLoggedIn, productRouter);
router.use('/carts', isLoggedIn, cartRouter);
router.use('/users', userRouter);

export default router;