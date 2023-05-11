import express from 'express';
import { __dirname } from './path.js';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views-router.js'
import ProductManager from './managers/product-manager.js';
const productManager = new ProductManager(__dirname + '/data/products.json')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);


const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('usuario conectado!', socket.id)

    socket.on('disconnect', () => {
        console.log('usuario desconectado!')
    })

    socketServer.emit('products', await productManager.getProducts())

    socket.on('add products', async (product) => {
        await productManager.addProduct(product)
        socketServer.emit('products', await productManager.getProducts())
    })
})


