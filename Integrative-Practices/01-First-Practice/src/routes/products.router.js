import { Router } from 'express'
import * as controller from '../controllers/products.controller.js'

const router = Router();

// router.get('/', getAllController);
router.get('/:id', controller.getByIdController);
router.post('/', controller.createController);
router.post('/add/:idCart/:idProduct', controller.addProductsToCart)
// router.put('/:id', updateController);
// router.delete('/:id', deleteByIdController);
// router.delete('/', deleteAllController);

export default router;