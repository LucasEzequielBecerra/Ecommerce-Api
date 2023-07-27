import { Router } from "express";
import * as controller from '../controllers/cart.controller.js'
import { validateLogIn } from "../middlewares/validateLogin.js";
const router = new Router();

router.get('/:cid', validateLogIn, controller.getCartByIdController)
router.post('/', controller.createCartController)
router.put('/:cid/products/:pid', controller.addProductToCartController)
router.delete('/:cid/products/:pid', controller.deleteProductToCartController)
router.delete('/:cid', controller.deleteAllProductsToCartController)

export default router;