import { Router } from 'express'
const router = Router()
import ProductManager from '../managers/product-manager.js'
const productManager = new ProductManager('./src/data/products.json')




router.get('/home', async (req, res) => {
    let products = await productManager.getProducts()
    console.log(products)
    res.render('home', { products })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realtimeproducts')
})

export default router