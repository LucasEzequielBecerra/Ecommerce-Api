import { ProductsModel } from "./models/products.model.js"
import { CartsModel } from "./models/carts.model.js"

export default class ProductsDaoMongoDB {

    async addProductsToCart(cartId, productId) {
        try {
            const cart = await CartsModel.findById(cartId)
            const quantity = cart.products[0].quantity = 1
            cart.products.push({ productId, quantity })
            cart.save()
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const res = await ProductsModel.findById(id)
            return res
        } catch (error) {
            console.log(error)
        }

    }
    async getProducts() {
        try {
            const res = await ProductsModel.find({})
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async addProducts(obj) {
        try {
            const res = await ProductsModel.create(obj)
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, obj) {
        try {
            await ProductsModel.updateOne({ _id: id }, obj)
            return obj
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProductById(id) {
        try {
            const res = await ProductsModel.findByIdAndDelete(id)
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAllProducts() {
        try {
            await ProductsModel.deleteMany()
        } catch (error) {
            console.log(error)
        }
    }
}