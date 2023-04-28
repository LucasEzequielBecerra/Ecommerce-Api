import express from 'express';
import ProductManager from './Manager/productManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if (product) {
            res.status(200).json({ message: 'Product found', product })
        } else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


app.post('/products', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const productFile = await productManager.getProductById(Number(id));
        if (productFile) {
            await productManager.updateProduct(Number(id), field);
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = await productManager.getProducts();
        if (products.length > 0) {
            await productManager.deleteProductById(Number(id));
            res.send(`product id: ${id} deleted successfully`);
        } else {
            res.send(`product id: ${id} not found`);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

app.delete('/products', async (req, res) => {
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});