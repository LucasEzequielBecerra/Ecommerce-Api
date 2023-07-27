export default class ProductResponseDTO {
    constructor(product) {
        this.name = product.name
        this.description = product.description
        this.price = product.price
    }
}