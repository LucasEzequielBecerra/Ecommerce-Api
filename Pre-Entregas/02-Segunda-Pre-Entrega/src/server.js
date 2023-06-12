import express from 'express';
import './db/database.js'
import morgan from 'morgan'
import { __dirname } from './path.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});

const socketServer = new Server(httpServer)

let userCartId = null

socketServer.on('connection', (socket) => {
    if (userCartId === null) {
        socket.emit('userNotLogged')
        socket.on('userCartId', (userCartIdResult) => {
            userCartId = userCartIdResult
        })
        console.log('conectado')
    } else {
        socket.emit('userCartAlreadyCreated', userCartId)
    }
})



