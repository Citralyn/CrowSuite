import { useState, useEffect } from 'react'
import crowLogo from './assets/crow.svg'
import { socket } from './socket.js';
import './App.css'
import Suit from './components/Suit.jsx'

function App() {
  // for tracking state of game
  const [count, setCount] = useState(0);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [cards, setCards] = useState([]);
  //const [currentCard, setCurrentCard] = useState(cards[0]);
  const [suit, setSuit] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [NumSelectedCards, setNumSelectedCards] = useState(0);

  // for testing purposes
  const [isConnected, setIsConnected] = useState(socket.connected);

  // for events that happen after each render
  useEffect(() => {
    socket.on('connect', onConnect);

    socket.on('updatePlayerNumber', (num) => {
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

    setSuit(cards[count].suit); 
    socket.emit('count', count); 
  }

  function newCard() {

    //setCurrentCard(cards[count]); 
    //console.log(cards[count].value)
    //setSuite(cards[count].suite);
  }

  return (
    <>
      <div>
        <img src={crowLogo} className="logo" />
      </div>
      <h1>CrowSuite</h1>
      <div className="card">
        <Suit suite_index={suit}/> 
        <button onClick={() => {newCard()}}>
        Change Card</button>
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

export default App
