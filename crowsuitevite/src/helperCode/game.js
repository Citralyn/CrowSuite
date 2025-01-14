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
        let cards = shuffleCards(generateDeck()); 
        this.cards = cards; 

        this.player1.playerCards = this.cards[0];
        this.player2.playerCards = this.cards[1];
        this.player3.playerCards = this.cards[2];
        this.player4.playerCards = this.cards[3];
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

    constructor() {
        this.online = true; 
    }
}

export { Game, Player };