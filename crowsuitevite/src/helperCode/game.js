import { generateDeck, shuffleCards } from "./deck.js"

class Game {
    gameRoom;
    gameNumber; 
    numberActivePlayers = 0; 
    readyToStart = false; 

    roundAmountOfCards = 0; 
    currentPlayerTurn = 1; 
    numberOfPasses = 0; 
    cards = []; 
    cardsInDeck = []; 

    player1;
    player2;
    player3;
    player4;
    players;

    winner = null;
    gameOver = false;  

    constructor(gameRoom, gameNumber) {
        this.gameRoom = gameRoom; 
        this.gameNumber = gameNumber; 
    }

    addPlayer(newPlayer) {
        newPlayer.gameRoom = this.gameRoom; 
        newPlayer.gameNumber = this.gameNumber; 

        if (this.numberActivePlayers == 0) {
            this.player1 = newPlayer;
        } else if (this.numberActivePlayers == 1) {
            this.player2 = newPlayer;
        } else if (this.numberActivePlayers == 2) {
            this.player3 = newPlayer;
        } else if (this.numberActivePlayers == 3) {
            this.player4 = newPlayer;
        } 

        this.numberActivePlayers += 1; 
        newPlayer.playerNumber = this.numberActivePlayers;

        if (this.numberActivePlayers == 4) {
            this.players = [this.player1, this.player2, this.player3, this.player4];
            this.readyToStart = true; 
            this.dealCards(); 
        }
    }

    dealCards() {
        let newCards = generateDeck(); 
        shuffleCards(newCards); 
        this.cards = newCards;

        this.player1.playerCards = newCards.slice(0, 13);
        this.player1.playerCards.sort((a, b) => (a.value - b.value));

        this.player2.playerCards = newCards.slice(13, 26); 
        this.player2.playerCards.sort((a, b) => (a.value - b.value));

        this.player3.playerCards = newCards.slice(26, 39); 
        this.player3.playerCards.sort((a, b) => (a.value - b.value));

        this.player4.playerCards = newCards.slice(39, 52);
        this.player4.playerCards.sort((a, b) => (a.value - b.value));
    }

    playCards(playerNumber, attemptingToPlay, numberOfCards) {
        this.numberOfPasses = 0;

        this.currentPlayerTurn += 1;
        if (this.currentPlayerTurn >= 5) {
            this.currentPlayerTurn = 1;
        }

        this.players[playerNumber - 1].numberOfCards -= numberOfCards;
        this.cardsInDeck = attemptingToPlay; 
        this.roundAmountOfCards = numberOfCards; 

        console.log(`Current player ${this.players[playerNumber - 1].username}
            has ${this.players[playerNumber - 1].numberOfCards}!`); 

        if (this.players[playerNumber - 1].numberOfCards == 0) {
            this.gameOver = true;
            this.winner = players[playerNumber - 1]; 
            console.log(`GAME OVER -> ${this.gameOver}`);
        }
    }

    pass() {
        this.numberOfPasses += 1; 

        this.currentPlayerTurn += 1;
        if (this.currentPlayerTurn >= 5) {
            this.currentPlayerTurn = 1;
        }

        if (this.numberOfPasses == 3) {
            this.numberOfPasses = 0; 
            this.roundAmountOfCards = 0; 
            this.cardsInDeck = [];
        }
    }

}

class Player {
    gameRoom;
    gameNumber; 

    online = false; 
    username; 
    playerNumber; 

    playerCards;
    numberOfCards = 13; 

    constructor(username) {
        this.username = username; 
        this.online = true; 
    }
}

export { Game, Player };