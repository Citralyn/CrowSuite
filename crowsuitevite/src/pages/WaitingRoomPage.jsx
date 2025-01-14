import { useState, useEffect } from 'react'
import './Pages.css'

export default function WaitingRoomPage({playerSocket, gameNumber}) { 
  const [numberOfPlayersJoined, setNumberOfPlayersJoined] = useState(0); 
  const [readyStatus, setReadyStatus] = useState(false); 

    
  useEffect(() => {
      playerSocket.on('addToPlayersJoined', (amount) => {
          setNumberOfPlayersJoined(amount); 
      });

      playerSocket.on('readyToStart', () => {
          setReadyStatus(true); 
      })
  }, []);

  function startGame() {
      playerSocket.emit("gameCanStart", gameNumber); 
  }

  if (readyStatus == true) {
    return(
      <div className="waitingMessage">
        <h1>4/4 Players Joined</h1>
        <h2 className="validStartButton" onClick={() => {startGame()}}>START</h2>
      </div>
    )
  } else {
    return(
      <div className="waitingMessage">
        <h1>{numberOfPlayersJoined}/4 Players Joined</h1>
        <h2 className="invalidStartButton">START</h2>
      </div>
    )
  }
}; 