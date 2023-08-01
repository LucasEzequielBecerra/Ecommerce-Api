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

    async addProductToCart(cid, pid, quantity) {
        try {
            const prodFindInDB = await ProductModel.findById(pid)
            const cartFind = await CartModel.findById(cid)
            if (!cartFind) throw new Error("Cart not found")

            const prodInCart = cartFind.products.find(product => product.pid === pid)
            if (prodFindInDB.stock < quantity || prodInCart?.quantity + quantity > prodFindInDB.stock) throw new Error(`The max stock is ${prodFindInDB.stock}`)
            else if (prodFindInDB.stock === 0) throw new Error('No stock available')


            let totalPrice = cartFind.total

            if (prodInCart) {
                const updatedQuantity = prodInCart.quantity + quantity
                await CartModel.updateOne(
                    { _id: cid, 'products.pid': pid },
                    { $set: { 'products.$.quantity': updatedQuantity, 'products.$.price': prodFindInDB.price } }
                );
            } else {
                await CartModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { pid: pid, quantity: quantity, price: prodFindInDB && prodFindInDB.price } } },
                );
            };

            totalPrice += quantity * prodFindInDB.price
            const cartUpdated = await CartModel.findById(cid)
            cartUpdated.total = totalPrice
            cartUpdated.save()
            return cartUpdated
        } catch (error) {
            console.log('manager error', error.message)
        }
    }

    async purchaseProducts(cid) {
        try {
            const cartFind = await CartModel.findById(cid)
            if (cartFind.products.length === 0) throw new Error('Cart not have any products')
            cartFind.products.map(async (product) => {
                const { pid } = product
                const { quantity } = product
                const prodFindInDB = await ProductModel.findById(pid)
                if (prodFindInDB.stock >= quantity) {
                    prodFindInDB.stock -= quantity
                    prodFindInDB.save()
                } else throw new Error('The product in cart is not stock available or not existing')
            })
            cartFind.total = 0
            cartFind.products = []
            cartFind.save()
            const cartUpdated = await CartModel.findById(cid)
            return cartUpdated
        }
        catch (error) {
            console.log(error.message)
        }
    }

    async deleteProductToCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid)
            const productToDelete = cart.products.find((prod) => prod.pid === pid)

            if (!productToDelete) throw new Error('Product in cart not found')
            if (productToDelete.quantity < quantity) throw new Error('The quantity must be minimum quantity')
            if (quantity) {
                productToDelete.quantity -= quantity
            }

            if (productToDelete.quantity === 0 || !quantity) {
                const newProducts = cart.products.filter((prod) => prod.pid !== pid)
                cart.products = newProducts
            }

            const amountFinal = productToDelete.price * productToDelete.quantity
            cart.total = amountFinal
            cart.save()

            return cart

        } catch (error) {
            console.log(error.message)
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