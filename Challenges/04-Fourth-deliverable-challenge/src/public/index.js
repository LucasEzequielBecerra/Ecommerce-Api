const socketClient = io()
import ProductManager from '../managers/product-manager.js'

const productManager = new ProductManager('./src/data/products.json')
