import express from 'express';
import { __dirname } from './path.js';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import routerProducts from './routes/products-router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('websockets');
});

app.use('/products', routerProducts);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('usuario conectado!', socket.id)
    socket.on('disconnect', () => {
        console.log('usuario desconectado!')
    })
})


