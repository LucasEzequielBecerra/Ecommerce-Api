
class ProductManager {
    constructor() {
        this.products = []
    }



    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.idGenerator()
        }
        const codeRepeat = this.products.find((prod) => prod.code === code)
        if (codeRepeat) {
            console.log(`El producto con el codigo ${code} ya existe`)
            return
        }
        else if (Object.values(product).includes(undefined)) {
            console.log('completar datos')
        } else {

            this.products.push(product)
        }

    }



    idGenerator() {
        let newId = 1
        this.products.map((prod) => {
            if (prod.id <= newId) newId++
        })
        return newId
    }

    getProducts() {
        return this.products

    }

    getProductById(prodId) {
        let prodFinded = this.products.find((prod) => prod.id === prodId)

        prodFinded ? console.log(prodFinded) : console.log('not found')
    }


}

const productManager = new ProductManager()

productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc1234', 24)
console.log('first asked ------------->', productManager.getProducts())
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc12345', 24)
console.log('second asked ------------->', productManager.getProducts())




