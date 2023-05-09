import { Router } from "express";
const router = Router()

import ProductManager from "../managers/product-manager.js";
import { productValidator } from "../middlewares/product-validator.js";
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if (product) {
            res.status(200).json({ message: 'Product found', product })
        } else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


router.post('/', productValidator, async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const field = req.body;
        const productFile = await productManager.getProductById(Number(pid));
        if (productFile) {
            await productManager.updateProduct(Number(pid), field);
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await productManager.getProducts();
        if (products.length > 0) {
            await productManager.deleteProductById(Number(pid));
            res.send(`product id: ${pid} deleted successfully`);
        } else {
            res.send(`product id: ${pid} not found`);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

router.delete('/', async (req, res) => {
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
})

export default router;