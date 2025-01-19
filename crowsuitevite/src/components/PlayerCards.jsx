import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import '../css/Components.css'

export default function PlayerCards({playerSocket, gameNumber, playerNumber}) {
  const [playerCards, setPlayerCards] = useState(
    [false, false, false, false, false, false, false,
      false, false, false, false, false, false
    ]);

      
    const [heldCards, setHeld] = useState(
      [false, false, false, false, false, false, false,
        false, false, false, false, false, false
      ]
    )


    useEffect(() => {
        playerSocket.emit('getCards', gameNumber, playerNumber);

        playerSocket.on('receiveCards', (cards) => {
          setPlayerCards(cards);
        })
    }, []);


    function play() {
        playerSocket.emit('attemptToPlay', gameNumber, playerNumber, heldCards);
    }

    function pass() {
        playerSocket.emit('attemptToPass', gameNumber, playerNumber);
    }

    return (
        <div>
            <div className="playerCards">
                {Array.from({ length: 13 }, (_, i) => (
                    <Card 
                        playerSocket={playerSocket}
                        index={i}
                        card={playerCards[i]}
                        cardType={0}
                        heldCards={heldCards}
                        setHeld={setHeld}
                    />
                ))}
            </div>

            <hr></hr>

            <div className="heldCards">
                {Array.from({ length: 13 }, (_, i) => (
                    <Card 
                        playerSocket={playerSocket}
                        index={i}
                        card={playerCards[i]}
                        cardType={1}
                        heldCards={heldCards}
                        setHeld={setHeld}
                    />
                ))}
            </div>

            <hr></hr>

            <div className="playOrPass">
                <button onClick={() => {play()}}> PLAY </button>
                <button onClick={() => {pass()}}> PASS </button>
            </div>
        </div>
      );
    }; 