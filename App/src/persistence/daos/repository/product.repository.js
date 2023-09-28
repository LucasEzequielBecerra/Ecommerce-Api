import factory from "../../factory.js";
const { productManager } = factory
import ProductResponseDTO from "../../dtos/product/product.response.dto.js";

export default class ProductRepository {

    async getAllProds(page, limit) {
        try {
            const res = await productManager.getAllProds(page, limit)
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProdById(pid) {
        try {
            const product = await productManager.getProdById(pid)
            if (!product) throw new Error("Product not found")
            const prodDTO = new ProductResponseDTO(product)
            return prodDTO
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createProd(obj) {
        try {
            const prod = await productManager.createProd(obj)
            return prod
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProdById(pid, user) {
        try {
            const res = await productManager.deleteProdById(pid, user)
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAllProducts() {
        try {
            const response = await productManager.deleteAllProducts()
            return response
        } catch (error) {
            throw new Error(error.message)
        }
    }
}