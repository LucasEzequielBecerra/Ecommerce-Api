import { Router } from "express";
import { getAllCartsController, getCartByIdController, addProductsToCartController } from "../controllers/carts.controller.js";

const router = new Router();

router.get('/', getAllCartsController)
router.get('/:cartid', getCartByIdController)
router.post('/:cartid', addProductsToCartController)

export default router;