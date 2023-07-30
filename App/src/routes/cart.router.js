import { Router } from "express";
import * as controller from '../controllers/cart.controller.js'
import { isUser } from "../middlewares/isUser.js";
const router = new Router();

router.get('/:cid', controller.getCartByIdController)
router.post('/', controller.createCartController)
router.put('/:cid/products/:pid', isUser, controller.addProductToCartController)
router.delete('/:cid/products/:pid', isUser, controller.deleteProductToCartController)
router.delete('/:cid', isUser, controller.deleteAllProductsToCartController)
router.post('/:cid/purchase', controller.purchaseProductsController)

export default router;