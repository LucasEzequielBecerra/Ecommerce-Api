import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan'
import config from '../config.js';
import { __dirname } from './utils.js';
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport';
import apiRouter from "./routes/api.router.js"
import './passport/github-passport.js'
import './passport/local-passport.js'

const app = express();
const PORT = config.PORT

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
            mongoUrl: config.MONGODB_URL_STRING_CONNECTION,
            // ttl: 30
        })
    })
)

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter)


app.listen(PORT, () => {
    console.log(`Server ok en puerto: ${PORT}`);
});




