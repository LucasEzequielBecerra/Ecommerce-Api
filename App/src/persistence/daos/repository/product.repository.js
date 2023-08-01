import factory from "../../factory.js";
const { productManager } = factory
import ProductResponseDTO from "../../dtos/product/product.response.dto.js";

export default class ProductRepository {

    async getProdById(id) {
        try {
            const product = await productManager.getById(id)
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
}