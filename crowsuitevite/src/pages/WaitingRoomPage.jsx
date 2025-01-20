import { useState, useEffect } from 'react'
import '../css/Pages.css'

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
        <button className="btn btn-primary" onClick={() => {startGame()}}>START</button>
      </div>
    )
  } else {
    return(
      <div className="generalFlexContainer">
        <div className="waitingMessage">
          <h1>{numberOfPlayersJoined}/4 Players Joined</h1>
          <button className="btn btn-primary" disabled>START</button>
        </div>
      </div>
      
    )
  }
}; 