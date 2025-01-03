import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

// create a server (using node and express)

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
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

// checking functions

function getPlayType(playerCards, numCards) {
    // this function checks for valid combinations of cards 
    if (numCards == 1) {
      // any single card is valid 
      return 1; 
    } else if (numCards == 2) {
      // check if pair (aka number value is the same)
      if (playerCards[0].number == playerCards[1].number) {
        return 2;  
      } else {
        return -1; 
      }
    } else if (numCards == 3) {
      // check if triple 
      if (playerCards[0].number == playerCards[1].number && 
        playerCards[1].number == playerCards[2].number) {
          return 3; 
      } else {
        return -1; 
      }
    } else if (numCards == 5) {
      //sort the cards by ascending value
      playerCards.sort((a, b) => (a.value - b.value));
  
      //check for straight
      if (playerCards[0].number == playerCards[1].number - 1) {
        if (playerCards[1].number == playerCards[2].number - 1) {
          if (playerCards[2].number == playerCards[3].number - 1) {
            if (playerCards[3].number == playerCards[4].number - 1) {

              // check for straight flush
              if (playerCards[0].suit == playerCards[0].suit) {
                if (playerCards[1].suit == playerCards[2].suit) {
                  if (playerCards[2].suit == playerCards[3].suit) {
                    if (playerCards[3].suit == playerCards[4].suit) {
                      return 55; 
                    }
                  }
                }
              }

              return 51; 
            }
          }
        }
      }
  
      //check for flush
      if (playerCards[0].suit == playerCards[0].suit) {
        if (playerCards[1].suit == playerCards[2].suit) {
          if (playerCards[2].suit == playerCards[3].suit) {
            if (playerCards[3].suit == playerCards[4].suit) {
              return 52; 
            }
          }
        }
      }
  
      //check for full house (High triple)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[2].number == playerCards[3].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 53;  
          }
        }
      }
  
      //check for full house (High pair)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[1].number == playerCards[2].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 53;
          }
        }
      }
  
      //check for four-of-a-kind (Low Single)
      if (playerCards[1].number == playerCards[2].number) {
        if (playerCards[2].number == playerCards[3].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 54; 
          }
        }
      }
  
      //check for four-of-a-kind (High Single)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[1].number == playerCards[2].number) {
          if (playerCards[2].number == playerCards[3].number) {
            return 54;
          }
        }
      } 
      
    } else {
      return -1; 
    }
    
    return -1; 

}

function higherThanDeck(playerCards, deckCards, numCards) {
  //sort by value (ascending)
  playerCards.sort((a, b) => (a.value - b.value)); 
  deckCards.sort((a, b) => (a.value - b.value)); 

  if (numCards == 1) {
    if (playerCards[0].value > deckCards[0].value) {
      return true; 
    } else {
      return false;
    }
  }

  if (numCards == 2) {
    if (playerCards[1].value > deckCards[1].value) {
      return true;
    } else {
      return false; 
    }
  }

  if (numCards == 3) {
    if (playerCards[2].value > deckCards[2].value) {
      return true; 
    } else {
      return false; 
    }
  }

  if (numCards == 5) {
    let playType1 = getPlayType(playerCards, numCards); 
    let playType2 = getPlayType(deckCards, numCards); 

    if (playType1 > playType2) {
      return true; 
    } else if (playType1 < playType2) {
      return false;
    } else {
      if (playType1 == 51) {
        //both are straights
        if (playerCards[4].value > deckCards[4].value) {
          return true; 
        } else {
          return false;
        }
      } else if (playType1 == 52) {
        //both are flushes
        if (playerCards[4].number > deckCards[4].number) {
          return true;
        } else if (playerCards[4].number == deckCards[4].number) {
          if (playerCards[3].number > deckCards[3].number) {
            return true;
          } else if (playerCards[3].number == deckCards[3].number) {
            if (playerCards[2].number > deckCards[2].number) {
              return true;
            } else if (playerCards[2].number == deckCards[2].number) {
              if (playerCards[1].number > deckCards[1].number) {
                return true;
              } else if (playerCards[1].number == deckCards[1].number) {
                if (playerCards[0].number > deckCards[0].number) {
                  return true; 
                } else if (playerCards[0].number == deckCards[0].number) {
                  if (playerCards[4].value > deckCards[0].value) {
                    return true;
                  } else {
                    return false; 
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
        
      } else if (playType1 == 53) {
        //both are full-houses

        if (playerCards[1].number == playerCards[2].number) {
          if (deckCards[1].number == deckCards[2].number) {
            //both full-houses have low triple
            if (playerCards[2].value > deckCards[2].value) {
              return true; 
            } else {
              return false;
            }
          } else {
            //player has low triple, deck has high triple
            if (playerCards[2].value > deckCards[4].value) {
              return true; 
            } else {
              return false;
            }
          }
        } else {
          if (deckCards[1].number == deckCards[2].number) {
            //player has high triple, deck has low triple
            if (playerCards[4].value > deckCards[2].value) {
              return true; 
            } else {
              return false;
            }
          } else {
            //both full-houses have high triple  
            if (playerCards[4].value > deckCards[4].value) {
              return true; 
            } else {
              return false;
            }
          }
        }
      } else if (playType1 == 54) {
        //both are 4-of-a-kinds

        if (playerCards[2].number > deckCards[2].number) {
          return true; 
        } else {
          return false; 
        }

      } else if (playType1 == 55) {
        //both are straight flushes

        if (playerCards[4].value > deckCards[4].value) {
          return true;
        } else {
          return false; 
        }
      }
    }
  }
}

let playerCount = 0;
//let playerMap = new Map();  
let activePlayers = 0;
let amountOfPasses = 0; 
let numberCards = [13, 13, 13, 13]; 
let usernames = ["", "", "", ""]; 

// on connection 

io.on('connection', (socket) => {

    socket.on('disconnection', (num) => {
      console.log(`${num} disconnected.`);
    }); 

    activePlayers += 1;

    if (activePlayers > 4) {
      activePlayers = 1; 
    }

    socket.emit("updatePlayerNumber", activePlayers); 

    socket.on("confirmUpdatedPlayerNumber", (num) => {
      console.log(`${num} connected.`);

      let start_index = (num - 1) * 13;
      let end_index = start_index + 13;

      socket.emit('deal_cards', cards.slice(start_index, end_index)); 
      io.emit('addConnectedPlayers', num); 
    })

    socket.on("getNewPlayerNumber", (num) => {
      let newNum = num + 1; 

      if (newNum > 4) {
        newNum = 1; 
      }
  
      socket.emit("updatePlayerNumber", newNum); 

    })

    socket.on('deckChange', (playedCards, player) => {
      let newPlayer = 1; 

      if (player < 4) {
        newPlayer = player + 1; 
      }
      io.emit('nextPlayer', playedCards, newPlayer);
    });

    socket.on('startOfRound', (newAmount) => {
      console.log(`new start: ${newAmount}`); 
      io.emit('setCardAmount', newAmount);
    }); 

    socket.on('increasePasses', () => {
      if (amountOfPasses < 2) {
        console.log(`increasing server passes? -> ${amountOfPasses}`)
        amountOfPasses += 1; 
        io.emit('updatePass'); 
      } else if (amountOfPasses == 2) {
        amountOfPasses = 0; 
        io.emit('newRound');
      }
    }); 

    socket.on('resetPasses', () => {
      amountOfPasses = 0; 
      io.emit('setPassToZero'); 
    })

    socket.on('updateUser', (username, playerNumber) => {
      playerCount += 1;
      usernames[playerNumber - 1] = username; 

      console.log(`Player ${playerNumber}: ${username}`); 

      if (playerCount == 4) {
        console.log("READY TO START")
        io.emit('gameReady', usernames); 
      }
    });

    socket.on("checkValidMove", (playerNum, heldCards, playerCards, deckCards, numCards) => {
      console.log(`VALID ThIS? = ${playerNum}, ${heldCards}, ${playerCards}, ${deckCards}, ${numCards}`); 
      
      let playType = getPlayType(playerCards, numCards); 

      console.log(`meow ${deckCards.length}`);

      if (playType == -1) {
        socket.emit('invalidMove'); 
      } else {
        if (deckCards.length == 0) {

          let newPlayer = 1; 

          if (playerNum < 4) {
            newPlayer = playerNum + 1; 
          }

          //testing purposes
          numberCards[playerNum - 1] -= numCards; 
          for (let i = 0; i < 4; i++) {
            console.log(`num cards ${i} ->  ${numberCards[i]}`); 
          }
          if (numberCards[playerNum - 1] <= 0) {
            io.emit("show_results", playerNum);
          }
          //

          console.log("BEFORE_CONFIRMATION");
          socket.emit('confirmMove', heldCards, numCards); 

          io.emit('nextPlayer', playerCards, newPlayer);

          amountOfPasses = 0; 
          io.emit('setPassToZero'); 

        } else if (higherThanDeck(playerCards, deckCards, numCards)) {
          //duplicate code :(

          let newPlayer = 1; 

          if (playerNum < 4) {
            newPlayer = playerNum + 1; 
          }

          //testing purposes
          numberCards[playerNum - 1] -= numCards; 
          for (let i = 0; i < 4; i++) {
            console.log(`num cards ${i} ->  ${numberCards[i]}`); 
          }
          if (numberCards[playerNum - 1] <= 0) {
            io.emit("show_results", playerNum);
          }
          //

          console.log("BEFORE_CONFIRMATION");
          socket.emit('confirmMove', heldCards, numCards); 

          io.emit('nextPlayer', playerCards, newPlayer);

          amountOfPasses = 0; 
          io.emit('setPassToZero'); 

        } else {
          socket.emit('tooLow');
        }
      } 
    });

});
