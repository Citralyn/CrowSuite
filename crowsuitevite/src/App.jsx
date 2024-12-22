import { useState, useEffect } from 'react'
import crowLogo from './assets/crow.svg'
import { socket } from './socket.js';
import './App.css'
import Card from './components/Card.jsx'
import SelectedCards from './components/SelectedCards.jsx'
import Deck from './components/Deck.jsx'

function App() {
  // for tracking state of game
  const [count, setCount] = useState(0);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentPlayer, changePlayer] = useState(1); 
  const [currentCard, setCurrentCard] = useState([]);
  const [holdingCards, setHoldingCards] = useState([]);
  const [holdingCardIndexes, setIndexes] = useState([]);
  const [usedCardIndexes, addToUsed] = useState([]);
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
      setCards(cards); 
    })

    socket.on('nextPlayer', (newCards, newPlayer) => {
      console.log("nextCard socket");
      console.log(newPlayer)
      console.log(`PASS -> ${numOfPasses}`); 
      setCurrentCard(newCards); 
      changePlayer(newPlayer); 
      setHoldingCards([]); 
      setIndexes([]);
      setNumSelectedCards(0); 
    }); 

    socket.on('newRound', () => {
      setCardCount(0); 
      updatePassNum(0); 
    })

    socket.on('show_results', (winner) => {
      if (winner == currentPlayer) {
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

    socket.on('updatePass', (amount) => {
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

    socket.on('confirmMove', (numCardsPlayed) => {
      if (cardCount == 0) {
        socket.emit('startOfRound', numCardsPlayed); 
      }
      let updatedUsedCards = usedCardIndexes;
      updatedUsedCards.push(...holdingCardIndexes);
      addToUsed(updatedUsedCards);

      let newIndividualCount = individualCardCount - numCardsPlayed;

      if (newIndividualCount == 0) {
        socket.emit('game_complete', currentPlayer); 
      }
      setIndividualCardCount(newIndividualCount); 

      setCurrentCard(holdingCards);

    })

    function onConnect() {
      setIsConnected(true);
    }

    return(() => {
      socket.off('connect', onConnect);
    })
  }, []);

  // for events/functions that react to the DOM
  function handleCount() {
    //example - for testing purposes
    if (count >= 12) {
      setCount(0); 
    } else {
      setCount(count + 1); 
    }

    socket.emit('count', count); 
  }

  function getCard(i) {
    let selectedCard = cards[i];
    return selectedCard;
  }

  function selectCard(i) {
    let selectedCards = holdingCards; 
    selectedCards.push(cards[i]); 
    let currentIndexes = holdingCardIndexes; 
    currentIndexes.push(i); 
    setIndexes[currentIndexes]; 

    if (numSelectedCards < 5) {
      setHoldingCards(selectedCards); 
      setNumSelectedCards(numSelectedCards + 1); 
    }
  }

  function play() {
    if (currentPlayer == playerNumber) {
      if (numSelectedCards == 0) {
        alert("Select Cards or Pass"); 
      } else if (numSelectedCards == 4) {
        alert("Select 1, 2, 3, or 5 Cards."); 
      } else {
        if (cardCount == 0 || numSelectedCards == cardCount) {
          console.log(`COUNT ${cardCount}`); 
 
          socket.emit('checkValidMove', playerNumber, holdingCards, currentCard, numSelectedCards); 

        } else {
          alert(`You need ${cardCount} number of cards.`);
        }
      }
    } else {
      alert("NOT YOUR TURN"); 
    }
  }

  function pass() {
    if (currentPlayer == playerNumber) {
      if (cardCount != 0) {
        console.log("increasing passes? -> socket"); 
        socket.emit('increasePasses'); 
        socket.emit('deckChange', currentCard, playerNumber); 
      } else {
        alert("It is your turn to start the round"); 
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
        <h2>Player {currentPlayer}'s Turn</h2>
        <p> Deck: </p>
        <div className = "playerCards">
          <Deck card_to_display={currentCard[0]}></Deck>
          <Deck card_to_display={currentCard[1]}></Deck>
          <Deck card_to_display={currentCard[2]}></Deck>
          <Deck card_to_display={currentCard[3]}></Deck>
          <Deck card_to_display={currentCard[4]}></Deck>
        </div>
        <p> You are Player {playerNumber}. Here are your cards: </p>
        <div className = "playerCards">
          <Card cardFunc={selectCard} index={0} card_to_display={getCard(0)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={1} card_to_display={getCard(1)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={2} card_to_display={getCard(2)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={3} card_to_display={getCard(3)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={4} card_to_display={getCard(4)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={5} card_to_display={getCard(5)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={6} card_to_display={getCard(6)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={7} card_to_display={getCard(7)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={8} card_to_display={getCard(8)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={9} card_to_display={getCard(9)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={10} card_to_display={getCard(10)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={11} card_to_display={getCard(11)} usedCards={usedCardIndexes}></Card>
          <Card cardFunc={selectCard} index={12} card_to_display={getCard(12)} usedCards={usedCardIndexes}></Card>
        </div>
        <p> Selected Cards: </p>
        <div className = "playerCards">
          <SelectedCards card_to_display={holdingCards[0]}></SelectedCards>
          <SelectedCards card_to_display={holdingCards[1]}></SelectedCards>
          <SelectedCards card_to_display={holdingCards[2]}></SelectedCards>
          <SelectedCards card_to_display={holdingCards[3]}></SelectedCards>
          <SelectedCards card_to_display={holdingCards[4]}></SelectedCards>
        </div>
        <div className="play_or_pass">
          <button onClick={() => {play()}}> PLAY </button>
          <button onClick={() => {pass()}}> PASS </button>
        </div>

        <p className="read-the-docs">
          Made with Socket.io and Vite
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
        <button onClick={() => {handleCount()}}>
          count is {count}
        </button>
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
