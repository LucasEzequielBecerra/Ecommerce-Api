import { Router } from "express";
const router = Router()


import CartManager from "../manager/cart-manager.js";
import ProductManager from "../manager/product-manager.js";

const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./cart.json');

router.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.status(200).json({ message: 'cart created' })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartManager.getCartById(Number(cid))
        if (cart) {
            res.status(200).json({ message: 'cart found', cart })
        } else {
            res.status(400).send('cart not found')
        }
        res.status(200).json();
    } catch (error) {
        console.log(error)
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartManager.getCartById(Number(cid))
        if (cart) {
            const product = await productManager.getProductById(Number(pid))
            if (product) {
                const cartWithProdAdded = cartManager.addProductsToCart(cid, pid)
                res.status(200).json(cartWithProdAdded)
            } else {
                res.status(400).send('product not found')
            }
        } else {
            res.status(400).send('cart not found')
        }
    } catch (error) {
        console.log(error)
    }
})

export default router;