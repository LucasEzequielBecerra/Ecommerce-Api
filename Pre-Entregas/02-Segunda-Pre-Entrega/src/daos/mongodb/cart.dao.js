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

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            const cart = await CartsModel.findById(cid)
            const prodIndex = cart.products.findIndex(product => product._id.toString() === pid.toString())
            // console.log(prodIndex)
            if (prodIndex >= 0) {
                if (quantity >= 1) {
                    cart.products[prodIndex].quantity++
                } else if (quantity <= 0) {
                    throw new Error('no puedes agregar 0 productos')
                } else {
                    cart.products[prodIndex].quantity = quantity
                }
            } else {
                cart.products.push({ _id: pid, quantity: 1, })
                // console.log(cart)
            }
            await cart.save()
            return cart
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
            return res.populate("products.product")
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