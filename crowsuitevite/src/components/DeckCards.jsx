import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import DeckCard from './DeckCard.jsx';
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
            {Array.from({ length: deck.length }, (_, i) => (
                <DeckCard deck={deck} index={i}></DeckCard>
            ))}
        </div>
    )
};