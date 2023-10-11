import { Router } from "express";
import * as controllerCart from '../controllers/cart.controller.js'
import * as controllerTicket from '../controllers/ticket.controller.js'
import { cartValidator, isAdmin, isPremium } from "../middlewares/auth.js";

const router = new Router();

router.get('/tickets', isAdmin, controllerTicket.getAllTicketsController)
router.post('/:cid/purchase', cartValidator, controllerTicket.createTicketsController)
router.get('/:cid', cartValidator, controllerCart.getCartByIdController)
router.put('/:cid/products/:pid', cartValidator, controllerCart.addProductToCartController)
router.delete('/:cid/products/:pid', cartValidator, controllerCart.deleteProductToCartController)
router.delete('/:cid', cartValidator, controllerCart.deleteAllProductsToCartController)


export default router;