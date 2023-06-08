import ProductManager from '../manager/product-manager.js'

const productManager = new ProductManager('./src/data/products.json')

export const productValidator = async (req, res, next) => {
    const product = req.body
    const { title, description, code, price, status, stock, category } = product
    const arrProd = await productManager.getProducts()

    if (!arrProd.find(prod => prod.code === code)) {
        next()
    } else {
        res.status(400).json({
            message: `Product with the code ${code} already exists`
        })
        return
    }
    if (title, description, code, price, status, stock, category !== undefined) {
        next()
    } else {
        res.status(404).json({
            message: 'Please fill all the fields, fields: title, description, code, price, status, stock, category'
        })
        return
    }

}