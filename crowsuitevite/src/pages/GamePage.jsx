import { useState, useEffect } from 'react'
import './Pages.css'
import personLogo from '../assets/person.svg'
import PlayerCards from '../components/PlayerCards.jsx'

export default function GamePage({playerSocket, gameNumber, playerNumber}) { 
  const [leftPlayer, setLeft] = useState({})
  const [topPlayer, setTop] = useState({})
  const [rightPlayer, setRight] = useState({})
  const [bottomPlayer, setBottom] = useState({})
  
  useEffect(() => {
        playerSocket.emit('getOtherPlayers', gameNumber);

        playerSocket.on('setUpOtherPlayers', (player1, player2, player3, player4) => {
          console.log(player1.username)
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
        });
    }, []);
  
  return (
  <>
    <h1>GAME PAGE</h1>
    <div className="generalFlexContainer">
      <div className="staticGameContent">
        <div className="Deck">
          <h1>asdfsdf asdfsdf asdfsdf asdfsdf</h1>
          <h2>asdkfsd</h2>
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
      <div className="playerStats">
        <h1>{bottomPlayer.username}     {bottomPlayer.numberOfCards}</h1>
      </div>
      <PlayerCards playerSocket={playerSocket} gameNumber={gameNumber} playerNumber={playerNumber}></PlayerCards>
      <div className="playOrPass">
        <button>PLAY</button>
        <button>PASS</button>
      </div>
    </div>
  </>
  );
}; 