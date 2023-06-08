import express from 'express';
import './db/database.js'
import morgan from 'morgan'
import { __dirname } from './path.js';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});