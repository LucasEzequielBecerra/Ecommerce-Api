import { Router } from "express";
import * as controllerCart from '../controllers/cart.controller.js'
import * as controllerTicket from '../controllers/ticket.controller.js'
import { isUser, cartValidator } from "../middlewares/auth.js";
const router = new Router();

router.get('/:cid', cartValidator, controllerCart.getCartByIdController)
// router.post('/', controller.createCartController)
router.put('/:cid/products/:pid', isUser, cartValidator, controllerCart.addProductToCartController)
router.delete('/:cid/products/:pid', isUser, cartValidator, controllerCart.deleteProductToCartController)
router.delete('/:cid', isUser, cartValidator, controllerCart.deleteAllProductsToCartController)
router.post('/:cid/purchase', cartValidator, controllerTicket.createTicketsController)

export default router;