import { Router } from 'express'
import {
    getAllController,
    getByIdController,
    createController,
    updateController,
    deleteByIdController,
    deleteAllController
} from '../controllers/products.controller.js'

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.put('/:id', updateController);
router.delete('/:id', deleteByIdController);
router.delete('/', deleteAllController);

export default router;