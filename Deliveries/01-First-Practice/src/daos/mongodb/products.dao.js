import { ProductsModel } from "./models/products.model.js"
import { CartsModel } from "./models/carts.model.js"

export default class ProductsDaoMongoDB {

    async addProduct(obj) {
        try {
            const res = await ProductsModel.create(obj)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProducts(page = 1, limit = 10) {
        try {
            const res = await ProductsModel.paginate({}, { page, limit })
            return res
        } catch (error) {
            console.log(error)
        }
    }
    // async addProductsToCart(cartId, productId) {
    //     try {
    //         const cartFinded = await CartsModel.findById(cartId)
    //         if(!cartFinded) throw new Error('Cart not found')
    //         const existingProduct = cartFinded.products.find(product => product.id === productId)
    //        if(existingProduct){
    //         const updatedQuantity = existingProduct.quantity + 1
    //         await CartsModel.updateOne({
    //             id: cartId, 'products._id': productId,
    //         },
    //         )
    //        }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // async getProductById(id) {
    //     try {
    //         const res = await ProductsModel.findById(id)
    //         return res
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }



    // async updateProduct(id, obj) {
    //     try {
    //         await ProductsModel.updateOne({ _id: id }, obj)
    //         return obj
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // async deleteProductById(id) {
    //     try {
    //         const res = await ProductsModel.findByIdAndDelete(id)
    //         return res
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // async deleteAllProducts() {
    //     try {
    //         await ProductsModel.deleteMany()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


}