

import { useState, useEffect } from 'react'

import './Card.css'


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

export default function DeckCard({deck, index}) {

    //let image_url = image_urls2[cardSuit][cardNumber];

    let card = deck[index]; 

    return (
        <div className="deckCard">
            <h1>{card.number} of {card.suit}s</h1>
        </div>
    )
};