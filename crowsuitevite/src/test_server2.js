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
import { getPlayType, higherThanDeck } from "./helperCode/validation.js"

// initial game to start things off 
let games = []
let game1 = new Game("room1", 1);
games.push(game1); 


let totalPlayers = 0;

io.on('connection', (socket) => {

    function updateBoard(gameNum, moveType) {
        let currentGame = games[gameNum - 1];
        let requestedGameRoom = currentGame.gameRoom;
        let playerTurn = currentGame.currentPlayerTurn; 
        let currentDeckCards = currentGame.cardsInDeck;
        let players = currentGame.players;

        if (moveType == "pass") {
            io.to(requestedGameRoom).emit("updateDeck", currentDeckCards);
            io.to(requestedGameRoom).emit("updateGameBoard", players, playerTurn);
        } else {
            io.to(requestedGameRoom).emit("updateGameBoard", players, playerTurn);
            io.to(requestedGameRoom).emit("updateDeck", currentDeckCards);
            io.to(requestedGameRoom).emit("updatePlayerUsed");
            if (currentGame.gameOver) {
                let winner = currentGame.winner.username; 
                setTimeout(() => {
                    io.to(requestedGameRoom).emit("gameOver", winner); 
                }, 1000); 
            }
        }
    }
    
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
        let currentGame = games[gameNum - 1];
        let requestedGameRoom = currentGame.gameRoom; 
        io.to(requestedGameRoom).emit("startGame");
    })

    socket.on("getCards", (gameNum, playerNum) => {
        let currentGame = games[gameNum - 1];
        let requestedCards = currentGame.players[playerNum - 1].playerCards;
        socket.emit("receiveCards", requestedCards);
    });

    socket.on("getDeck", (gameNum) => {
        let currentGame = games[gameNum - 1];
        socket.emit("updateDeck", currentGame.players, currentGame.currentPlayerTurn);
    });

    socket.on("getGameBoard", (gameNum) => {
        let currentGame = games[gameNum - 1];
        socket.emit("updateGameBoard",currentGame.players, currentGame.currentPlayerTurn);
    });

    socket.on("attemptToPass", (gameNum, playerNum) => {
        let currentGame = games[gameNum - 1];
        let roundAmount = currentGame.roundAmountOfCards;
        let playerTurn = currentGame.currentPlayerTurn; 

        if (playerNum == playerTurn) {
            if (roundAmount == 0) {
                socket.emit("invalidPassOnStart");
            } else {
                currentGame.pass(); 
                updateBoard(gameNum, "pass");
            }
        } else {
            socket.emit("notYourTurn"); 
        }
    }); 

    socket.on("attemptToPlay", (gameNum, playerNum, heldCards) => {
        let currentGame = games[gameNum - 1];
        let playerTurn = currentGame.currentPlayerTurn; 
        let playerCards = currentGame.players[playerNum - 1].playerCards;
        let roundAmount = currentGame.roundAmountOfCards;
        let currentDeckCards = currentGame.cardsInDeck;

        if (playerNum == playerTurn) {
            let attemptingToPlay = []; 
            for (let i = 0; i < 13; i++) {
                if (heldCards[i] == true) {
                    attemptingToPlay.push(playerCards[i]);
                }
            }

            let numberOfCards = attemptingToPlay.length;

            let playType = getPlayType(attemptingToPlay, numberOfCards);
            if (playType == -10) {
                socket.emit("invalidAmount");
            } else if (playType == -1) {
                socket.emit("invalidCombination");
            } else {
                roundAmount = currentGame.roundAmountOfCards;
                if (roundAmount == 0) {
                    currentGame.playCards(playerNum, attemptingToPlay, numberOfCards); 
                    updateBoard(gameNum, "play");
                } else {
                    if (numberOfCards == roundAmount) {
                        if (higherThanDeck(attemptingToPlay, currentDeckCards, numberOfCards)) {
                            currentGame.playCards(playerNum, attemptingToPlay, numberOfCards); 
                            updateBoard(gameNum, "play");
                        } else {
                            socket.emit("notHigherThanDeck")
                        }
                    } else {
                        socket.emit("wrongAmount"); 
                    }
                }
            }
        } else {
            socket.emit("notYourTurn")
        }
    })
});
