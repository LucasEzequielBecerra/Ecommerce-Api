import { Router } from "express";
import productsRouter from './products.router.js'
import cartsRouter from './carts.router.js'
import userRouter from './user.router.js'
import viewsRouter from './views.router.js'

const router = new Router()

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/users', userRouter);
router.use('/', viewsRouter);

export default router;