import express from 'express';
import { __dirname } from './path.js';
import productsRouter from './routes/products-router.js'
import cartRouter from './routes/cart-router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});