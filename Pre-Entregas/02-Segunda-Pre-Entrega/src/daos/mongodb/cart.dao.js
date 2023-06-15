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

    async addProductToCart(cid, pid) {
        try {
            const cartFind = await CartsModel.findById(cid)
            if (!cartFind) throw new Error("Cart not found")
            const existingProduct = await cartFind.products.find(productIt => productIt._id === pid);
            if (existingProduct) {
                const updatedQuantity = existingProduct.quantity + 1
                await CartsModel.updateOne(
                    { _id: cid, 'products._id': pid },
                    { $set: { 'products.$.quantity': updatedQuantity } }
                );
            } else {
                await CartsModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } },
                );
            };
            const cartUpdate = await CartsModel.findById(cid).populate('products._id');
            return cartUpdate
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            const cart = await CartsModel.findById(cid)
            const prodIndex = cart.products.findIndex(product => product._id.toString() === pid.toString())
            console.log(prodIndex)
            const newCart = cart.products.splice(prodIndex, 1)
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProductsToCart(cid) {
        try {
            let cart = await CartsModel.findById(cid)
            console.log(cart)
            cart.products = []
            console.log(cart)
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId) {
        try {
            const res = await CartsModel.findById(cartId)
            return res.populate('products')
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