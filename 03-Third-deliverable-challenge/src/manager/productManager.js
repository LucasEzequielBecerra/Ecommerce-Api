import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = './products.json'
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
        const { title, description, price, thumbnail, stock } = obj
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            id: await this.idGenerator(),
        }
        try {
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
            return productFinded ? productFinded : 'El producto con el id seleccionado, no existe'
        } catch (err) {
            console.log(err)
        }
    }

    async deleteProduct(prodId) {
        try {
            const productsFile = await this.getProducts()
            if (typeOf(await this.getProductById(prodId)) === 'object') {
                const productsNotRemoved = productsFile.filter((prod) => prod.id !== prodId)
                await fs.promises.writeFile(this.path, JSON.stringify(productsNotRemoved, null, 2))
                // console.log(productsNotRemoved)
                return productsNotRemoved
            } else {
                return 'El producto con el id seleccionado, no existe'
            }
        } catch (err) {
            console.log(err)
        }
    }

    async updateProduct(prodId, field) {
        try {
            const productFile = await this.getProductById(prodId)
            if (typeof (productFile) === 'object') {
                const modifiedProduct = { ...productFile, ...field, id: prodId }
                const productsFileToUpdated = await this.deleteProduct(prodId)
                productsFileToUpdated.push(modifiedProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFileToUpdated, null, 2))
            } else {
                return 'El producto con el id seleccionado, no existe'
            }
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

    async deleteAllProducts(){
        try {
            if(fs.existsSync(this.path)){
                await fs.promises.unlink(this.path)
            }
        } catch (error) {
            console.log(error);
        }
    }

}