import { CartsModel } from "./models/carts.model.js"

export default class CartsDaoMongoDB {

    async getCarts() {
        try {
            const carts = await CartsModel.find({})
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async createCart() {
        try {
            const cartFile = {
                products: []
            }
            const cart = await CartsModel.create(cartFile)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartsModel.findById(cartId)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductsToCart(cartId, productId) {
        try {
            const cart = await CartsModel.findById(cartId)
            cart.products.push(productId)
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }
}