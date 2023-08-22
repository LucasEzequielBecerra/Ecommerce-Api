import factory from "../../factory.js";
const { cartManager } = factory

export default class CartRepository {


    async createCart() {
        try {
            const newCart = await cartManager.createCart();
            if (!newCart) throw new Error('Cart already exists')
            else return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid, quantity, uid) {
        try {
            const newCart = await cartManager.addProductToCart(cid, pid, quantity, uid);
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProductToCart(cid, pid, quantity) {
        try {
            const newCart = await cartManager.deleteProductToCart(cid, pid, quantity);
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProductsToCart(cid) {
        try {
            const newCart = await cartManager.deleteAllProductsToCart(cid)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const doc = await cartManager.getCartById(cartId)
            if (!doc) throw new Error('Cart not found')
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCarts() {
        try {
            const docs = await cartManager.getCarts()
            if (!docs) throw new Error('carts not found')
            else return docs
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(id) {
        try {
            const cartDeleted = await cartManager.deleteCart(id)
            return cartDeleted
        } catch (error) {
            console.log(error);
        }
    }

    async purchaseProducts(cid) {
        const products = await cartManager.purchaseProducts(cid)
        return products
    }
}
