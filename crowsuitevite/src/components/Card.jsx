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

export default function Card({index, value, cardFunction, cardType, heldCards}) {
    console.log(`${index}, ${value}, ${cardType}, ${location}`)
    let cardNumber = Math.floor(value.value / 4);
    let cardSuit = (value.value - 1) % 4; 
    let newLocation = 0;

    //let image_url = image_urls2[cardSuit][cardNumber];

    function handleClick(i) {
        cardFunction(i);
        
        if (cardType == 0) {
            newLocation = 1;
        } else {
            newLocation = 0;
        }
    }

    if ((cardType == 0 && heldCards[index] == false) ||
    (cardType == 1 && heldCards[index] == true)) {
        return(
            <>
            <div className="playerCard" onClick={() => {handleClick(index)}}>
              <h1>{cardNumber} of {cardSuit}s</h1>
            </div>
            </>
        )
    } else {
        return(
            <></>
        )
    }
};