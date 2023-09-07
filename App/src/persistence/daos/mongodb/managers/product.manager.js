import { ProductModel } from "../models/product.model.js";
import mongoose from "mongoose";




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

    async getProdById(pid) {
        try {
            const res = await ProductModel.findById(pid)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProdById(pid, user) {
        try {
            const { email, role } = user
            const prod = await this.getProdById(pid)
            console.log(prod)
            if (!prod) return false
            const objectId = new mongoose.Types.ObjectId(pid)
            if (prod.owner !== email && role !== 'admin') throw new Error('you dont have permission')
            await ProductModel.deleteOne({ _id: objectId })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProducts() {
        try {
            await ProductModel.deleteMany()
        } catch (error) {
            console.log(error)
        }
    }

}
