import { useState, useEffect } from 'react'
import '../css/Pages.css'
import personLogo from '../assets/person.svg'
import PlayerCards from '../components/PlayerCards.jsx'
import DeckCards from '../components/DeckCards.jsx'

export default function GamePage({playerSocket, gameNumber, playerNumber}) { 
  const [currentPlayer, setCurrent] = useState("");

  const [leftPlayer, setLeft] = useState({})
  const [topPlayer, setTop] = useState({})
  const [rightPlayer, setRight] = useState({})
  const [bottomPlayer, setBottom] = useState({})
  
  useEffect(() => {
        playerSocket.emit('getGameBoard', gameNumber);

        playerSocket.on('updateGameBoard', (players, playerTurn) => {
          let player1 = players[0]
          let player2 = players[1]
          let player3 = players[2]
          let player4 = players[3]

            if (playerNumber == 1) {
                setLeft(player2);
                setTop(player3);
                setRight(player4);
                setBottom(player1)
            } else if (playerNumber == 2) {
                setLeft(player1);
                setTop(player3);
                setRight(player4);
                setBottom(player2)
            } else if (playerNumber == 3) {
              setLeft(player1);
              setTop(player2);
              setRight(player4);
              setBottom(player3)
            } else if (playerNumber == 4) {
              setLeft(player1);
              setTop(player2);
              setRight(player3);
              setBottom(player4)
            }

            let currentPlayer = players[playerTurn - 1];
            setCurrent(currentPlayer.username); 
        });

    }, []);


  
  return (
  <>
    <h1>Current Player's Turn: {currentPlayer}</h1>
    <div className="generalFlexContainer">
      <div className="staticGameContent">
        <div className="Deck">
          <DeckCards playerSocket={playerSocket} gameNumber={gameNumber}></DeckCards>
        </div>
        <div className="TopPlayer">
          <div className="opponent">
            <img src={personLogo}></img>
            <p>{topPlayer.username}</p>
            <p>{topPlayer.numberOfCards}</p>
          </div>
        </div>
        <div className="LeftPlayer">
          <div className="opponent">
            <img src={personLogo}></img>
            <p>{leftPlayer.username}</p>
            <p>{leftPlayer.numberOfCards}</p>
          </div>
        </div>
        <div className="RightPlayer">
          <div className="opponent">
            <img src={personLogo}></img>
            <p>{rightPlayer.username}</p>
            <p>{rightPlayer.numberOfCards}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="personalizedGameContent">
    <hr></hr>
      <div className="playerStats">
        <h1>Player: {bottomPlayer.username}</h1>
        <h1>Amount of Cards: {bottomPlayer.numberOfCards}</h1>
      </div>
      <hr></hr>
      <PlayerCards playerSocket={playerSocket} gameNumber={gameNumber} playerNumber={playerNumber}></PlayerCards>
    </div>
  </>
  );
}; 