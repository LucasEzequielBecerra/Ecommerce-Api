import { CartsModel } from "./models/carts.model.js"

export default class CartsDaoMongoDB {

    async createCart() {
        try {
            const cart = await CartsModel.create({})
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCarts() {
        try {
            const carts = await CartsModel.find({})
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const res = await CartsModel.findById(cartId)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(cartId) {
        try {
            const res = await CartsModel.findByIdAndDelete(cartId)
            return res
        } catch (error) {
            console.log(error);
        }
    }
}
