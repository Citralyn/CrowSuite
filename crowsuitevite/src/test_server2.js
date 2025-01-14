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

        let currentGame = games[games.length - 1]; 

        let newPlayer = new Player(username);
        currentGame.addPlayer(newPlayer); 
        socket.join(currentGame.gameRoom); 
        socket.emit("addPlayerInformation", newPlayer.gameNumber, newPlayer.playerNumber)
        io.to(currentGame.gameRoom).emit("addToPlayersJoined", newPlayer.playerNumber)

        // room is full?
        // send ready alert and add new game for next set of players
        if (currentGame.readyToStart == true) {
            //testing purposes:

            console.log(`
                1 ${currentGame.player1.username},
                2 ${currentGame.player2.username},
                3 ${currentGame.player3.username},
                4 ${currentGame.player4.username}`)
            
            // end of test segment
            
            console.log(`${currentGame.gameRoom} is ready to start`);
            io.to(currentGame.gameRoom).emit("readyToStart");

            let newGameRoom = "room" + (games.length + 1); 
            let newGame = new Game(newGameRoom, games.length + 1);
            games.push(newGame);
        }
    })

    socket.on("gameCanStart", (gameNum) => {
        let requestedGameRoom = games[gameNum - 1].gameRoom; 
        io.to(requestedGameRoom).emit("startGame");
    })
});
