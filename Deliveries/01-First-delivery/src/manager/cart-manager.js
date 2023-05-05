import fs from 'fs';
// import ProductManager from './product-manager';

// const productManager = new ProductManager

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async idGenerator() {
        let newId = 1
        const productsFile = await this.getCarts()
        productsFile.map((prod) => {
            if (prod.id <= newId) newId++
        })
        return newId
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(carts)
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }

    async createCart() {
        try {
            const newId = await this.idGenerator()
            const cart = {
                id: newId,
                products: []
            }
            const cartsFile = await this.getCarts()
            cartsFile.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const cartsFile = await this.getCarts()
            const cartFinded = cartsFile.find(c => c.id === cartId)
            return cartFinded ? cartFinded : false
        } catch (error) {
            console.log(error)
        }
    }

    async addProductsToCart(cartId, productId) {
        try {
            const cartsFile = await this.getCarts()
            const newCartsFile = cartsFile.filter((c) => c.id !== Number(cartId))
            console.log(newCartsFile)
            const cartFinded = await this.getCartById(Number(cartId))
            // const productFinded = await productManager.getProductById(productId)
            // const { id } = productFinded
            cartFinded.products.push({ id: Number(productId) })
            // console.log(cartFinded)
            newCartsFile.push(cartFinded)
            await fs.promises.writeFile(this.path, JSON.stringify(newCartsFile, null, 2))
        } catch (error) {
            console.log(error)
        }
    }
}