const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = './products.json'
    }

    async addProduct(title, description, price, thumbnail, stock) {

        const product = {
            title,
            description,
            price,
            thumbnail,

            stock,

        }

        try {
            const productsFile = await this.getProducts()
            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        } catch (error) {
            console.log(error)
        }
    }



    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8')

                const productsJSON = JSON.parse(products)
                return productsJSON
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }

    // getProductById(prodId) {
    //     let prodFinded = this.products.find((prod) => prod.id === prodId)

    //     prodFinded ? console.log(prodFinded) : console.log('not found')
    // }


}

const productManager = new ProductManager()

const test = async () => {
    const get = await productManager.getProducts()
    console.log('primer consulta -------->', get)

    await productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 26)
    const get2 = await productManager.getProducts()
    console.log('segunda consulta -------->', get2)

}
test()
