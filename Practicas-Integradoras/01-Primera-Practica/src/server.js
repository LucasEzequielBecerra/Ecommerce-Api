import express from 'express';
import './db/database.js'
import morgan from 'morgan'
import Path from './path.js';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesSocket from './routes/messages.router.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import MessagesDaoDB from './daos/mongodb/message.dao.js';

const msgDao = new MessagesDaoDB()
const path = Path
console.log(path)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path + '/public'));

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path + '/views')

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/messages', messagesSocket)

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log('server ok en port', PORT)
});

const socketServer = new Server(httpServer)
socketServer.on('connection', async (socket) => {
    socket.emit('userConect');
    const arrayMsg = await msgDao.getAllMessages;
    socket.emit('arrayMsg', arrayMsg);
    socket.on('newMessage', async (data) => {
        const userName = data.userName
        const message = data.message
        await msgDao.sendMessage(userName, message);
        const arrayMsgUpdated = await msgDao.getAllMessages();
        socket.emit('arrayMsg', arrayMsgUpdated);
    });
    socket.on('deleteMsg', async (msgId) => {
        await msgDao.deleteMessage(msgId);
        const arrayMsgUpdatedDel = await msgDao.getAllMessages();
        socket.emit('arrayMsg', arrayMsgUpdatedDel);
    });
});