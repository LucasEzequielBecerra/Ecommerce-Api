import { Router } from 'express'
import * as controllers from '../controllers/product.controller.js'
import { isPremium } from '../middlewares/auth.js';

const router = Router();

router.get('/', controllers.getAllProductsController);
router.get('/:pid', controllers.getByIdController);

router.post('/', isPremium, controllers.addProductController)
router.delete('/:pid', isPremium, controllers.deleteByIdController);

router.delete('/', controllers.deleteAllController);
// router.put('/:pid', updateController);

export default router;