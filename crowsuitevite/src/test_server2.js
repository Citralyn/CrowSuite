import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// create a server (using node and express)

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      //change from local host to private ip for testing purposes (SPOT 3)
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST'],
    },
});


server.listen(5174, () => {
    console.log('server running on port 5174');
}); 

let activePlayers = 0;

io.on('connection', (socket) => {
    activePlayers += 1;
    socket.emit("updatePlayerNumber", activePlayers); 

    socket.on('helloToServer', (num) => {
        console.log(`received ${num} from client`); 
    })

    socket.on('pageChange', () => {
        console.log("Page has changed.")
    })
});
