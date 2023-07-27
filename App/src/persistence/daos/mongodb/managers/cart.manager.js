import { CartModel } from "../models/cart.model.js"

export default class CartManagerMongo {

    async createCart() {
        try {
            const cart = await CartModel.create({})
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartFind = await CartModel.findById(cid)
            if (!cartFind) throw new Error("Cart not found")
            const existingProduct = cartFind.products.find(productIt => productIt._id === pid);
            if (existingProduct) {
                const updatedQuantity = existingProduct.quantity + 1
                await CartModel.updateOne(
                    { _id: cid, 'products._id': pid },
                    { $set: { 'products.$.quantity': quantity ? quantity : updatedQuantity } }
                );
            } else {
                await CartModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: quantity ? quantity : 1 } } },
                );
            };
            const cartUpdate = await CartModel.findById(cid)
            return cartUpdate
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            let cart = await CartModel.findById(cid)
            const newProducts = cart.products.filter((prod) => prod._id.toString() !== pid.toString())
            cart.products = newProducts
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProductsToCart(cid) {
        try {
            let cart = await CartModel.findById(cid)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const res = await CartModel.findOne({ _id: cartId })
            return res.populate('products._id')
        } catch (error) {
            console.log(error)
        }
    }
}