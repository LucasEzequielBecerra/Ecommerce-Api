import { Router } from "express";
import * as controller from '../controllers/carts.controller.js'
const router = new Router();

router.get('/all', controller.getAllCartsController)
router.get('/:cartid', controller.getCartByIdController)
router.post('/', controller.createCartController)

export default router;