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

    async addProductToCart(cid, pid, quantity) {
        try {
            const cartFind = await CartsModel.findById(cid)
            if (!cartFind) throw new Error("Cart not found")
            const existingProduct = cartFind.products.find(productIt => productIt._id === pid);
            if (existingProduct) {
                const updatedQuantity = existingProduct.quantity + 1
                await CartsModel.updateOne(
                    { _id: cid, 'products._id': pid },
                    { $set: { 'products.$.quantity': quantity ? quantity : updatedQuantity } }
                );
            } else {
                await CartsModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: quantity ? quantity : 1 } } },
                );
            };
            const cartUpdate = await CartsModel.findById(cid)
            return cartUpdate
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            let cart = await CartsModel.findById(cid)
            const newProducts = cart.products.filter((prod) => prod._id.toString() !== pid.toString())
            cart.products = newProducts
            cart.save()
            console.log(cart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProductsToCart(cid) {
        try {
            let cart = await CartsModel.findById(cid)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const res = await CartsModel.findOne({ _id: cartId })
            return res.populate('products._id')
        } catch (error) {
            console.log(error)
        }
    }

    //     async getCarts() {
    //         try {
    //             const carts = await CartsModel.find({})
    //             return carts
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }



    //     async deleteCart(cartId) {
    //         try {
    //             const res = await CartsModel.findByIdAndDelete(cartId)
    //             return res
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

}