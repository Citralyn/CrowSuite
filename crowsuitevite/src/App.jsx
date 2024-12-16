import { useState, useEffect } from 'react'
import crowLogo from './assets/crow.svg'
import { socket } from './socket.js';
import './App.css'
import Suit from './components/Suit.jsx'
import Card from './components/Card.jsx'
import SelectedCards from './components/SelectedCards.jsx'
import Deck from './components/Deck.jsx'

function App() {
  // for tracking state of game
  const [count, setCount] = useState(0);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentPlayer, changePlayer] = useState(1); 
  const [currentCard, setCurrentCard] = useState(cards[0]);
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);
  const [suit, setSuit] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [NumSelectedCards, setNumSelectedCards] = useState(0);

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
      setCardCount(13); 
      setNumSelectedCards(0); 
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
    let selectedCard = cards[i];
    if (currentPlayer == playerNumber) {
      console.log(selectedCard);
      setCurrentCard(selectedCard);
      if (currentPlayer >= 4) {
        changePlayer(1); 
      } else {
        changePlayer(currentPlayer + 1);
      }
    } else {
      console.log("NOT UR TURN")
    }
  }

  if (cards != []) {
    return (
      <>
        <div className="header">
          <h1>CrowSuite</h1>
          <img src={crowLogo} className="logo" />
        </div>
        <p>For Big2 and Bird Enthusiasts!</p>
        <p>Player {currentPlayer}'s Turn</p>
        <p> Deck: </p>
        <Deck card_to_display={currentCard}></Deck>
        <p> You are Player {playerNumber}. Here are your cards. </p>
        <div className = "playerCards">
          <Card cardFunc={selectCard} index={0} card_to_display={getCard(0)}></Card>
          <Card cardFunc={selectCard} index={1} card_to_display={getCard(1)}></Card>
          <Card cardFunc={selectCard} index={2} card_to_display={getCard(2)}></Card>
          <Card cardFunc={selectCard} index={3} card_to_display={getCard(3)}></Card>
        </div>
        <p> Selected Cards: </p>
        <SelectedCards card_to_display={currentCard}></SelectedCards>
        <div className="card">
          <button onClick={() => {handleCount()}}>
            count is {count}
          </button>

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
