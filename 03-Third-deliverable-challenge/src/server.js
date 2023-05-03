import express from 'express';
import ProductManager from './manager/productManager';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./products.json')

app.get('/products', async (req, res) => {
    try {
        const produucts = await productManager.getProducts()
        res.status(200).json(produucts)
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)
    }
})

app.get('/products:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.getProductById(id)
        if (product) {
            res.status(200).json({ message: 'Product found', product })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)
    }
})

app.get('/products', async (req, res) => {
    try {
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)
    }
})

app.get('/products', async (req, res) => {
    try {
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)
    }
})

app.get('/products', async (req, res) => {
    try {
    } catch (error) {
        res.status(404).json({ message: error.message })
        console.log(error)
    }
})
