import factory from "../../factory.js";
const { cartManager } = factory

export default class CartRepository {

    async createCart() {
        try {
            const newCart = await cartManager.createCart();
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getCartById(cartId) {
        try {
            const doc = await cartManager.getCartById(cartId)
            return doc
        } catch (error) {
            throw new Error(error.message)
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
            throw new Error(error.message)
        }
    }

    async deleteAllProductsToCart(cid) {
        try {
            const newCart = await cartManager.deleteAllProductsToCart(cid)
            return newCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async purchaseProducts(cid) {
        try {
            const products = await cartManager.purchaseProducts(cid)
            return products
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
