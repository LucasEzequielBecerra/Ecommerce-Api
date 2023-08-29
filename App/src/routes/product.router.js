import { Router } from 'express'
import * as controller from '../controllers/product.controller.js'
import { isPremium } from '../middlewares/auth.js';

const router = Router();

router.post('/', isPremium, controller.addProductController)
router.get('/', controller.getAllProductsController);
router.get('/:pid', controller.getByIdController);
router.delete('/:pid', isPremium, controller.deleteByIdController);
// router.put('/:pid', updateController);
// router.delete('/', deleteAllController);

export default router;