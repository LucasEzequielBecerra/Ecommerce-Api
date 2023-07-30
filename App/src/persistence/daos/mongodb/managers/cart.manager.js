import { CartModel } from "../models/cart.model.js"
import { ProductModel } from "../models/product.model.js"

export default class CartManagerMongo {

    async createCart() {
        try {
            const cart = await CartModel.create({})
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            const prodFind = await ProductModel.findById(pid)
            const cartFind = await CartModel.findById(cid)
            if (!cartFind) throw new Error("Cart not found")

            if (prodFind.stock < quantity) throw new Error(`The max stock is ${prodFind.stock}`)
            else prodFind.stock -= quantity

            let totalPrice = cartFind.total

            const existingProductInCart = cartFind.products.find(productIt => productIt.pid === pid);
            if (existingProductInCart) {
                const updatedQuantity = existingProductInCart.quantity + quantity
                await CartModel.updateOne(
                    { _id: cid, 'products.pid': pid },
                    { $set: { 'products.$.quantity': updatedQuantity, 'products.$.price': prodFind.price } }
                );
            } else {
                await CartModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { pid: pid, quantity: quantity, price: prodFind && prodFind.price } } },
                );
            };

            totalPrice += quantity * prodFind.price
            cartFind.total = totalPrice
            cartFind.save()
            return cartFind
        } catch (error) {
            console.log(error)
        }
    }

    async purchaseProducts(cid) {
        try {
            const cartFind = await CartModel.findById(cid)
            if (cartFind.products.length === 0) return
            const prodsInCart = cartFind.products.map(product => product.pid)

            return prodsInCart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            let cart = await CartModel.findById(cid)
            const newProducts = cart.products.filter((prod) => prod._id.toString() !== pid.toString())
            cart.products = newProducts
            cart.total = 0
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
            cart.total = 0
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const res = await CartModel.findOne({ _id: cartId })
            return res
        } catch (error) {
            console.log(error)
        }
    }
}