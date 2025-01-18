import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import './Components.css'

export default function DeckCards({playerSocket, gameNumber}) {
    const [deck, setDeck] = useState([]); 
  
    useEffect(() => {
        playerSocket.emit('getDeck', gameNumber);

        playerSocket.on('updateDeck', (deckCards) => {
            setDeck(deckCards);
        });
    }, []);

    return (
        <div className="deckCards">
            <h1>s{deck.length}</h1>
            {Array.from({ length: deck.length }, (_, i) => (
                <h1>{deck[i].number} of {deck[i].suit}s</h1>
            ))}
        </div>
    )
};