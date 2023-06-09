import { Router } from 'express'
import * as controller from '../controllers/products.controller.js'

const router = Router();

router.post('/', controller.addProductController)
router.get('/', controller.getAllProductsController);
// router.get('/:id', controller.getByIdController);
// router.post('/', controller.createController);
// router.post('/add/:idCart/:idProduct', controller.addProductsToCart)
// router.put('/:id', updateController);
// router.delete('/:id', deleteByIdController);
// router.delete('/', deleteAllController);

export default router;