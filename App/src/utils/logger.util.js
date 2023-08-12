import winston from "winston";
const { combine, printf, timestamp, colorize } = winston.format;
import config from '../../config.js';

const ENV = config.ENV

const myCustomLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'black',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'grey',
        debug: 'blue',
    }
}

winston.addColors(myCustomLevels.colors)

const loggerDevConfig = {
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)

    ),
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './error.log',
            level: 'error',
        })
    ],
    level: 'debug',
}
const loggerProdConfig = {
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)

    ),
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './error.log',
            level: 'error',
        })
    ],
    level: 'info',
}



export const logger = winston.createLogger(ENV === 'dev' ? loggerDevConfig : loggerProdConfig);
logger.debug('nashe')