import crowLogo from '../assets/crow.svg'
import duckLogo from '../assets/duck.svg'
import pigeonLogo from '../assets/pigeon.svg'
import seagullLogo from '../assets/seagull.svg'

import './Card.css'

const image_urls = {
  "pigeon": pigeonLogo,
  "duck": duckLogo,
  "seagull": seagullLogo,
  "crow": crowLogo
}

export default function Deck({card_to_display}) {
    console.log({card_to_display})
    if (card_to_display == undefined) {
        return;
      } else {
        let value = card_to_display.value; 
        let number = card_to_display.number;
        let suit = card_to_display.suit;
        console.log(`${value}, ${number}, ${suit}`)
    
        return (
          <div className="playerCard">
            <h1>{number} of {suit}s</h1>
            <img
            src={image_urls[suit]}
          />
          </div>
        );
      }
    }; 