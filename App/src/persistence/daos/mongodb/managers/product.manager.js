import { ProductModel } from "../models/product.model.js";


export default class ProductManagerMongo {

    async createProd(obj) {
        try {
            const res = await ProductModel.create(obj)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProds(page = 1, limit = 10) {
        try {
            const res = await ProductModel.paginate({}, { page, limit })
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getProdById(id) {
        try {
            const res = await ProductModel.findById(id)
            return res
        } catch (error) {

        }
    }
}
