import crowLogo from '../assets/crow_logo.png'
import duckLogo from '../assets/duck_logo.png'
import pigeonLogo from '../assets/pigeon_logo.png'
import seagullLogo from '../assets/seagull_logo.png'

import crowKing from '../assets/crow_king.png'
import duckKing from '../assets/duck_king.png'
import pigeonKing from '../assets/pigeon_king.png'
import seagullKing from '../assets/seagull_king.png'

import crowQueen from '../assets/crow_queen.png'
import duckQueen from '../assets/duck_queen.png'
import pigeonQueen from '../assets/pigeon_queen.png'
import seagullQueen from '../assets/seagull_queen.png'

import crowJack from '../assets/crow_jack.png'
import duckJack from '../assets/duck_jack.png'
import pigeonJack from '../assets/pigeon_jack.png'
import seagullJack from '../assets/seagull_jack.png'

import { useState, useEffect } from 'react'

import '../css/Components.css'

const suit_urls = {
    "pigeon": pigeonLogo,
    "duck": duckLogo,
    "seagull": seagullLogo,
    "crow": crowLogo
}

const face_card_urls = [
{
  "pigeon": pigeonJack,
  "duck": duckJack,
  "seagull": seagullJack,
  "crow": crowJack
},
{
    "pigeon": pigeonQueen,
    "duck": duckQueen,
    "seagull": seagullQueen,
    "crow": crowQueen
},
{
    "pigeon": pigeonKing,
    "duck": duckKing,
    "seagull": seagullKing,
    "crow": crowKing
}
]

const card_numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]; 

export default function Card({playerSocket, index, card, cardType, heldCards, setHeld}) {
    const [usedCards, setUsed] = useState(
        [false, false, false, false, false, false, false,
          false, false, false, false, false, false
        ]
    )

    const cardGrid = `playingCard${card_numbers[card.number - 1]}`;

    let cardSuitURL = suit_urls[card.suit]
    let image_url = ""; 

    if (card.number == 10) {
        image_url = face_card_urls[0][card.suit];
    } else if (card.number == 11) {
        image_url = face_card_urls[1][card.suit];
    } else if (card.number == 12) {
        image_url = face_card_urls[2][card.suit];
    }

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
                <div className="cardIdentifier">
                    <div className="cardNumber">
                        <h1>{card_numbers[card.number - 1]}</h1>
                    </div>
                    <div className="cardSuit">
                        <img src={cardSuitURL}></img>
                    </div>
                </div>
                <div className="centralImage">
                    <img src={image_url}></img>
                </div>
            </div>
            </>
        )
    } else {
        return(
            <></>
        )
    }
};