import factory from "../../factory.js";
const { productManager } = factory
import ProductResponseDTO from "../../dtos/product/product.response.dto.js";

export default class ProductRepository {
    constructor() {
        this.dao = productManager
    }

    async getProdById(id) {
        try {
            const product = await this.dao.getById(id)
            const prodDTO = new ProductResponseDTO(product)
            return prodDTO
        } catch (error) {
            console.log(error)
        }
    }

    async createProd(obj) {
        try {
            const prod = await this.dao.createProd(obj)
            return prod
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProds(page, limit) {
        try {
            const res = await this.dao.getAllProds(page, limit)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}