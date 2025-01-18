import crowLogo from '../assets/crow.svg'
import duckLogo from '../assets/duck.svg'
import pigeonLogo from '../assets/pigeon.svg'
import seagullLogo from '../assets/seagull.svg'

import { useState, useEffect } from 'react'

import './Card.css'

const image_urls = {
  "pigeon": pigeonLogo,
  "duck": duckLogo,
  "seagull": seagullLogo,
  "crow": crowLogo
}

// imports here

const image_urls2 = [
    [
//pigeons
    ],
    [
//ducks
    ],
    [
//seagulls
    ],
    [
//crows
    ]
]

export default function Card({playerSocket, index, card, cardType, heldCards, setHeld}) {
    const [usedCards, setUsed] = useState(
        [false, false, false, false, false, false, false,
          false, false, false, false, false, false
        ]
    )

    //let image_url = image_urls2[cardSuit][cardNumber];

    useEffect(() => {
        playerSocket.on('updatePlayerUsed', () => {
            let currentlyHeldCards = [...heldCards]; 
            let currentlyUsedCards = [...usedCards];
  
            for (let i = 0; i < 13; i++) {
              if (currentlyHeldCards[i] == true) {
                currentlyUsedCards[i] = true;
              }
              currentlyHeldCards[i] = false;
            }
  
            setHeld(currentlyHeldCards);
            setUsed(currentlyUsedCards);
          })
        }); 

    function handleClick(i) {
        let currentlyHeldCards = [...heldCards]; 
        if (cardType == 0) {
            console.log(`Selecting ${i}`)
            currentlyHeldCards[i] = true;
        } else {
            console.log(`Deselecting ${i}`)
            currentlyHeldCards[i] = false;
        }
        setHeld(currentlyHeldCards); 
    }

    if (usedCards[index] == true) {
        console.log("used"); 
        return;
    } else if ((cardType == 0 && heldCards[index] == false) ||
    (cardType == 1 && heldCards[index] == true)) { 
        console.log("not used")
        return(
            <>
            <div className="playerCard" onClick={() => {handleClick(index)}}>
              <h1>{card.number} of {card.suit}s</h1>
            </div>
            </>
        )
    } else {
        return(
            <></>
        )
    }
};