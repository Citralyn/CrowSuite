import { useState, useEffect } from 'react'
import crowLogo from './assets/crow.svg'
import { socket } from './socket.js';
import './App.css'
import Card from './components/Card.jsx'
import SelectedCards from './components/SelectedCards.jsx'
import Deck from './components/Deck.jsx'
import test from 'node:test';

function App() {
  // for tracking state of game
  const [playerNumber, setPlayerNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentPlayer, changePlayer] = useState(1); 
  const [cardsInDeck, setDeckCards] = useState([]);
  const [heldCards, setHeldCards] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false
  });
  const [usedCards, addToUsed] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false
  });
  const [testCount, setTestCount] = useState(13); 
  const [individualCardCount, setIndividualCardCount] = useState(13); 
  const [numOfPasses, updatePassNum] = useState(0); 
  const [cardCount, setCardCount] = useState(0);
  const [numSelectedCards, setNumSelectedCards] = useState(0);

  // for testing purposes
  const [isConnected, setIsConnected] = useState(socket.connected);

  // for events that happen after each render
  useEffect(() => {
    socket.on('connect', onConnect);

    socket.on('updatePlayerNumber', (num) => {
      console.log(num); 
      setPlayerNumber(num); 
    })

    socket.on('deal_cards', (cards) => {
      console.log("DEALT.")
      cards.sort((a, b) => a.value - b.value); 
      setCards(cards); 
    })

    socket.on('nextPlayer', (newCards, newPlayer) => {
      //alert(`CURR: ${newPlayer}, YOU: ${playerNumber}`); 
      console.log(`my current count = ${individualCardCount}`)
      console.log("nextCard socket");
      console.log(newPlayer)
      console.log(`PASS -> ${numOfPasses}`); 
      setDeckCards(newCards); 
      changePlayer(newPlayer); 
      setHeldCards({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
      })
      setNumSelectedCards(0); 
    }); 

    socket.on('newRound', () => {
      setDeckCards([]);
      setCardCount(0); 
      updatePassNum(0); 

      //alert(`CURR: ${currentPlayer}, YOU: ${playerNumber}`); 
      if (currentPlayer == playerNumber) {
        //alert("Your turn to start");
      } else {
        //alert(`${currentPlayer}'s turn to start`)
      }
    })

    socket.on('show_results', (winner) => {
      console.log(`${winner} won!`); 
      if (winner == playerNumber) {
        alert("YOU WON!");
      } else {
        alert(`PLAYER ${winner} WON!`);
      }
    }); 

    socket.on('setCardAmount', (newCardAmount) => {
      console.log(`GIVEN COUNT -> ${newCardAmount}`)
      setCardCount(newCardAmount); 
      console.log(`CARD COUNT -> ${cardCount}`)
    })

    socket.on('updatePass', () => {
      updatePassNum(numOfPasses + 1); 
      console.log(`socket pass amount -> ${numOfPasses}`)
    })

    socket.on('setPassToZero', () => {
      updatePassNum(0); 
    })

    socket.on('tooLow', () => {
      alert("Not high enough.");
    })

    socket.on('invalidMove', () => {
      alert("Invalid combination.");
    });

    socket.on('confirmMove', (cardsInHand, numCardsPlayed) => {
      console.log("AFTER CONFIRMATION");

      if (cardCount == 0) {
        socket.emit('startOfRound', numCardsPlayed); 
      }

      let updatedUsedCards = usedCards; 

      //for testing purposes
      async function testCall() {
        const result = await setNum(testCount - 1);
        console.log(`test -> ${result}`);
      }
      testCall(); 

      if (testCount == 0) {
        alert("test done")
      }
      //
      

      for (let i = 0; i < 13; i++) {
        console.log(cardsInHand[i])
      }


      for (let i = 0; i < 13; i++) {
        if (cardsInHand[i] == true) {
          console.log(`in confirmation, holding ${i}`)
          updatedUsedCards[i] = true; 
        }
      }

      addToUsed(updatedUsedCards);

      let newIndividualCount = individualCardCount - numCardsPlayed;

      console.log(`NEWCOUNT -> ${newIndividualCount}`); 

      if (newIndividualCount == 0) {
        socket.emit('game_complete', currentPlayer); 
      }

      setIndividualCardCount(newIndividualCount); 
      let currentDeck = [];

      for (let i = 0; i < 13; i++) {
        if (cardsInHand[i] == true) {
          currentDeck.push(cards[i]);
        }
      }
      
      setDeckCards(currentDeck); 
      console.log(`done confirmation`);

    })

    function onConnect() {
      setIsConnected(true);
    }

    return(() => {
      socket.off('connect', onConnect);
    })
  }, []);

  // for events/functions that react to the DOM

  function getCard(i) {
    let selectedCard = cards[i];
    return selectedCard;
  }

  function selectCard(i) {

    if (heldCards[i] == false) {
      if (numSelectedCards < 13) {
        let selectedCards = heldCards;
        selectedCards[i] = true;
        setHeldCards(selectedCards);
        setNumSelectedCards(numSelectedCards + 1); 
      }
    }

  }

  function deselectCard(i) {
    let selectedCards = heldCards;
    selectedCards[i] = false; 
    setHeldCards(selectedCards);
    setNumSelectedCards(numSelectedCards - 1); 
  }

  function play() {
    if (currentPlayer == playerNumber) {
      if (numSelectedCards == 0) {
        alert("Select Cards or Pass"); 
      } else if (numSelectedCards == 4 || numSelectedCards > 5) {
        alert("Select 1, 2, 3, or 5 Cards."); 
      } else {
        if (cardCount == 0 || numSelectedCards == cardCount) {
          let cardsInHand = [];

          for (let i = 0; i < 13; i++) {
            if (heldCards[i] == true) {
              console.log(`trying to play ${i}`)
              cardsInHand.push(cards[i]);
            }
          }

          socket.emit('checkValidMove', playerNumber, heldCards, cardsInHand, cardsInDeck, numSelectedCards); 

        } else {
          if (cardCount == 1) {
            alert(`You need to play a single.`);
          } else {
            alert(`You can only play ${cardCount} number of cards.`);
          }
        }

      }
    } else {
      alert("NOT YOUR TURN"); 
    }
  }

  function setNum(num) {
    setTestCount(num); 
    return testCount; 
  }

  function pass() {
    if (currentPlayer == playerNumber) {
      if (cardCount != 0) {
        //alert("YOU PASSED");
        console.log("YOU PASSED"); 
        socket.emit('deckChange', cardsInDeck, playerNumber); 
        socket.emit('increasePasses'); 
      } else {
        alert("It is your turn to start the round!"); 
      }
      
    } else {
      alert("NOT YOUR TURN"); 
    }
  }

  if (cards != []) {
    return (
      <>
        <div className="header">
          <h1>CrowSuite</h1>
          <img src={crowLogo} className="logo" />
        </div>
        <p className="read-the-docs">For Big2 and Bird Enthusiasts!</p>
        <hr></hr>
        <h2>Player {currentPlayer}'s Turn</h2>
        <p> Deck: </p>
        <div className = "playerCards">
          <Deck card_to_display={cardsInDeck[0]}></Deck>
          <Deck card_to_display={cardsInDeck[1]}></Deck>
          <Deck card_to_display={cardsInDeck[2]}></Deck>
          <Deck card_to_display={cardsInDeck[3]}></Deck>
          <Deck card_to_display={cardsInDeck[4]}></Deck>
        </div>
        <p> You are Player {playerNumber}. Here are your cards: </p>
        <div className = "playerCards">
          <Card cardFunc={selectCard} index={0} card_to_display={getCard(0)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={1} card_to_display={getCard(1)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={2} card_to_display={getCard(2)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={3} card_to_display={getCard(3)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={4} card_to_display={getCard(4)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={5} card_to_display={getCard(5)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={6} card_to_display={getCard(6)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={7} card_to_display={getCard(7)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={8} card_to_display={getCard(8)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={9} card_to_display={getCard(9)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={10} card_to_display={getCard(10)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={11} card_to_display={getCard(11)} heldCards={heldCards} usedCards={usedCards}></Card>
          <Card cardFunc={selectCard} index={12} card_to_display={getCard(12)} heldCards={heldCards} usedCards={usedCards}></Card>
        </div>
        <p> Selected Cards: </p>
        <div className = "playerCards">
          <SelectedCards cardFunc={deselectCard} index={0} card_to_display={getCard(0)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={1} card_to_display={getCard(1)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={2} card_to_display={getCard(2)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={3} card_to_display={getCard(3)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={4} card_to_display={getCard(4)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={5} card_to_display={getCard(5)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={6} card_to_display={getCard(6)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={7} card_to_display={getCard(7)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={8} card_to_display={getCard(8)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={9} card_to_display={getCard(9)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={10} card_to_display={getCard(10)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={11} card_to_display={getCard(11)} heldCards={heldCards}></SelectedCards>
          <SelectedCards cardFunc={deselectCard} index={12} card_to_display={getCard(12)} heldCards={heldCards}></SelectedCards>
        </div>
        <hr></hr>
        <div className="play_or_pass">
          <button onClick={() => {play()}}> PLAY </button>
          <button onClick={() => {pass()}}> PASS </button>
        </div>

        <hr></hr>

        <p className="read-the-docs">
          React for UI</p>
        <p className="read-the-docs">
          Express and Node HTTP for server & routing 
          </p>
        <p className="read-the-docs">
          Socket.io for real-time communication</p>
        <p className="read-the-docs">
          Vite for bundling and development
        </p>
      </>
    )

  } else {
    return(
      <>
      <div>
        <img src={crowLogo} className="logo" />
      </div>
      <h1>CrowSuite2</h1>
      <h2> {playerNumber} </h2>
      <div className="card">
        <p>
          For Big2 and Bird Enthusiasts!
        </p>
      </div>
      <p className="read-the-docs">
        Made with Socket.io and Vite
      </p>
    </>
    )
  }

  
}

export default App
