import config from "../../../../../config.js";
import { transporter } from "../../../../services/email.service.js";
import { ProductModel } from "../models/product.model.js";
import mongoose from "mongoose";




export default class ProductManagerMongo {

    async getAllProds(page = 1, limit = 10) {
        try {
            const res = await ProductModel.paginate({}, { page, limit })
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProdById(pid) {
        try {
            const res = await ProductModel.findById(pid)
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createProd(obj) {
        try {
            const res = await ProductModel.create(obj)
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProdById(pid, user) {
        try {
            const { email, role } = user
            const prod = await this.getProdById(pid)
            if (!prod) return false
            const objectId = new mongoose.Types.ObjectId(pid)
            if (prod.owner !== email && role !== 'admin') throw new Error('you dont have permission')
            const gmailOptions = {
                from: config.EMAIL_HOST,
                to: 'lucaseramos13@gmail.com', //seria el email que esta en prod.owner
                subject: 'Your product has been deleted',
                html: `<h1>Hello ${user.first_name}, your prod ${prod.description} ${prod.name} with id ${prod._id} has been deleted</h1>`
            }
            await transporter.sendMail(gmailOptions)
            const res = await ProductModel.deleteOne({ _id: objectId })
            return `${res.deletedCount} product deleted successfully`
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAllProducts() {
        try {
            const response = await ProductModel.deleteMany()
            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }

}
