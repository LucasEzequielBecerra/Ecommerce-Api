import fs from 'fs';

export default class ProductDaoFS {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(products)
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }

    async addProduct(obj) {
        try {
            const newId = await this.idGenerator()
            const product = {
                id: newId,
                ...obj
            }
            const productsFile = await this.getProducts()
            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(prodId) {
        try {
            const productsFile = await this.getProducts()
            const productFinded = productsFile.find(p => p.id === prodId)
            return productFinded ? productFinded : false
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProductById(prodId) {
        try {
            const productsFile = await this.getProducts()
            const productsNotRemoved = productsFile.filter((prod) => prod.id !== prodId)
            await fs.promises.writeFile(this.path, JSON.stringify(productsNotRemoved, null, 2))
            return productsNotRemoved
        } catch (err) {
            console.log(err)
        }
    }

    async updateProduct(prodId, field) {
        try {
            const productFile = await this.getProductById(prodId)
            const modifiedProduct = { ...productFile, ...field, id: prodId }
            const productsFileToUpdated = await this.deleteProductById(prodId)
            productsFileToUpdated.push(modifiedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFileToUpdated, null, 2))
        } catch (err) {
            console.log(err)
        }


    }

    async idGenerator() {
        let newId = 1
        const productsFile = await this.getProducts()
        productsFile.map((prod) => {
            if (prod.id <= newId) newId++
        })
        return newId
    }

    async deleteAllProducts() {
        try {
            if (fs.existsSync(this.path)) {
                await fs.promises.unlink(this.path)
            }
        } catch (error) {
            console.log(error);
        }
    }

}