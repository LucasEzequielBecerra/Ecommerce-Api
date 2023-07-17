import { Router } from "express";
import * as controller from '../controllers/carts.controller.js'
const router = new Router();

// router.get('/all', controller.getAllCartsController)
router.get('/:cid', controller.getCartByIdController)
router.post('/', controller.createCartController)
router.put('/:cid/products/:pid', controller.addProductToCartController)
router.delete('/:cid/products/:pid', controller.deleteProductToCartController)
router.delete('/:cid', controller.deleteAllProductsToCartController)

export default router;