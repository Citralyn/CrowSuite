import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// create a server (using node and express)

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Replace with your React app's URL
      methods: ['GET', 'POST'],
    },
});


server.listen(5174, () => {
    console.log('server running on port 5174');
}); 


// game preparation

let cards = [];
let birds = ["pigeon", "duck", "seagull", "crow"];

function shuffleCards(given_cards) {
  let c = given_cards.length;

  while (c != 0) {
    let r = Math.floor(Math.random() * c);
    c--; 

    [given_cards[c], given_cards[r]] = [given_cards[r], given_cards[c]];
  }
}

let card_index = 1; 
for (let i = 1; i <= 13; i++) {
for (let j = 0; j < 4; j++) {
    let card = {}; 
    card.value = card_index;
    card.number = i;
    card.suit = birds[j]; 
    cards.push(card); 

    card_index += 1;
}
}

shuffleCards(cards); 

let activePlayers = 0;

// on connection 

io.on('connection', (socket) => {
    console.log("user connected.");

    activePlayers += 1;

    if (activePlayers > 4) {
      activePlayers = 1; 
    }

    socket.emit("updatePlayerNumber", activePlayers); 

    let start_index = (activePlayers - 1) * 13;
    let end_index = start_index + 13;

    socket.emit('deal_cards', cards.slice(start_index, end_index)); 
    
    socket.on('count', (ct) => {
        console.log(`count: ${ct}`);
    });

    socket.on('deckChange', (card, player) => {
      console.log("nextCard server");
      let newPlayer = 1; 

      if (player < 4) {
        newPlayer = player + 1; 
      }
      io.emit('nextPlayer', card, newPlayer);
    })
});
