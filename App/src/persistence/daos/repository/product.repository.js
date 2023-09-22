import factory from "../../factory.js";
const { productManager } = factory
import ProductResponseDTO from "../../dtos/product/product.response.dto.js";

export default class ProductRepository {

    async getProdById(pid) {
        try {
            const product = await productManager.getProdById(pid)
            if (!product) throw new Error("Product not found")
            const prodDTO = new ProductResponseDTO(product)
            return prodDTO
        } catch (error) {
            console.log(error)
        }
    }

    async createProd(obj) {
        try {
            const prod = await productManager.createProd(obj)
            return prod
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProds(page, limit) {
        try {
            const res = await productManager.getAllProds(page, limit)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProdById(pid, user) {
        try {
            const res = await productManager.deleteProdById(pid, user)
            console.log(res, 'xd en repository')
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllProducts() {
        try {
            await productManager.deleteAllProducts()
        } catch (error) {
            console.log(error)
        }
    }
}