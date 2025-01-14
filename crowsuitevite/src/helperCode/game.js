import { generateDeck, shuffleCards } from "./deck.js"

class Game {
    gameRoom;
    gameNumber; 
    numberActivePlayers = 0; 
    readyToStart = false; 

    roundAmountOfCards;
    currentPlayerTurn;
    numberOfPasses;
    cards;
    cardsInDeck;

    player1;
    player2;
    player3;
    player4;
    winner = null; 

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
            this.readyToStart = true; 
            this.dealCards(); 
        }
    }

    dealCards() {
        let newCards = generateDeck(); 
        shuffleCards(newCards); 
        this.cards = newCards;

        this.player1.playerCards = newCards.slice(0, 13);
        this.player2.playerCards = newCards.slice(13, 26); 
        this.player3.playerCards = newCards.slice(26, 39); 
        this.player4.playerCards = newCards.slice(39, 52);
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