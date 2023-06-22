import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import './db/database.js'
import morgan from 'morgan'
import { __dirname } from './path.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import userRouter from './routes/user.router.js'
import viewsRouter from './routes/views.router.js'
import passport from 'passport';
import './db/database.js'
import './passport/github-passport.js'
import './passport/local-passport.js'

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

app.use(cookieParser())
app.use(
    session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10000
        },
        store: new mongoStore({
            mongoUrl: 'mongodb+srv://Becerra:Lucasbecerra.1@cluster0.2eff3zo.mongodb.net/Backend?retryWrites=true&w=majority',
            ttl: 60
        })
    })
)

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);


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
    } else {
        socket.emit('userCartAlreadyCreated', userCartId)
    }
})



