import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan'
import config from '../config.js';
import mongoStoreString from './persistence/factory.js'
import { __dirname } from './utils.js';
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport';
import apiRouter from "./routes/api.router.js"
import './passport/github-passport.js'
import './passport/local-passport.js'
import { logger } from './utils/logger.util.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { info } from './docs/info.js'

const app = express();
const PORT = config.PORT

const specs = swaggerJSDoc(info)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))

app.use(cookieParser())
app.use(
    session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000000
        },
        store: new mongoStore({
            mongoUrl: 'mongodb+srv://Becerra:Lucasbecerra.1@cluster0.2eff3zo.mongodb.net/Test?retryWrites=true&w=majority',
        })
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

app.use('/api', apiRouter)


app.listen(PORT, () => {
    logger.info(`Server ok en puerto: ${PORT}`);
});

export default app;




