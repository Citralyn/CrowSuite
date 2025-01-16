import { useState, useEffect } from 'react'
//import { useSocket } from '../pages/GamePage.jsx'
import Card from './Card.jsx'
import './Components.css'

export default function PlayerCards({playerSocket, gameNumber, playerNumber}) {
    const [location, setLocation] = useState(0); 
  
    const [playerCards, setPlayerCards] = useState(
      [false, false, false, false, false, false, false,
        false, false, false, false, false, false
      ]);

    const [usedCards, updateUsedCards] = useState(
      [false, false, false, false, false, false, false,
        false, false, false, false, false, false
      ]
    )
    const [cardsInHand, updateCardsInHand] = useState(
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

  //just a check for used needed

    function selectCard(i) {
        console.log(`Selecting ${i}`)
        let currentlyHeldCards = cardsInHand;
        currentlyHeldCards[i] = true;
        updateCardsInHand(currentlyHeldCards); 
        setLocation(1);
    }

    function deselectCard(i) {
        console.log(`Deselecting ${i}`)
        let currentlyHeldCards = cardsInHand;
        currentlyHeldCards[i] = false;
        updateCardsInHand(currentlyHeldCards); 
        setLocation(0); 
    }

    return (
        <div>
            <div className="playerCards">
                {Array.from({ length: 13 }, (_, i) => (
                    <Card 
                        index={i}
                        value={playerCards[i]}
                        cardFunction={selectCard} 
                        cardType={0}
                        heldCards={cardsInHand}
                    />
                ))}
            </div>

            <hr></hr>

            <div className="heldCards">
                {Array.from({ length: 13 }, (_, i) => (
                    <Card 
                        index={i}
                        value={playerCards[i]}
                        cardFunction={deselectCard} 
                        cardType={1}
                        heldCards={cardsInHand}
                    />
                ))}
            </div>
        </div>
      );
    }; 