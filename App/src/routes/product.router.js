import { Router } from 'express'
import * as controller from '../controllers/product.controller.js'
import { isAdmin } from '../middlewares/auth.js';

const router = Router();

router.post('/', isAdmin, controller.addProductController)
router.get('/', controller.getAllProductsController);
// router.get('/:id', controller.getByIdController);
// router.put('/:id', updateController);
// router.delete('/:id', deleteByIdController);
// router.delete('/', deleteAllController);

export default router;