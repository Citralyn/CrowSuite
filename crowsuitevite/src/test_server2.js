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

import { Game, Player } from "./helperCode/game.js"

// initial game to start things off 
let games = []
let game1 = new Game("room1", 1);
games.push(game1); 


let totalPlayers = 0;

io.on('connection', (socket) => {
    

    socket.on("addNewPlayer", (username) => {
        totalPlayers += 1;

        // check if latest room is full
        let currentGame = games[games.length - 1]; 

        // room is full? send players to a new game
        if (currentGame.readyToStart == true) {
            console.log(`${currentGame.gameRoom} is ready to start`);
            io.to(currentGame.gameRoom).emit("readyToStart");

            let newGameRoom = "room" + (games.length + 1); 
            let newGame = new Game(newGameRoom, games.length + 1);
            games.push(newGame);
        }

        currentGame = games[games.length - 1]; 

        let newPlayer = new Player(username);
        currentGame.addPlayer(newPlayer); 
        socket.join(currentGame.gameRoom); 
        socket.emit("addPlayerInformation", newPlayer.gameNumber, newPlayer.playerNumber)
    })
});
