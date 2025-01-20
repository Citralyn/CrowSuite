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

export default function DeckCard({deck, index}) {

    //let image_url = image_urls2[cardSuit][cardNumber];

    let card = deck[index]; 

    let cardSuitURL = suit_urls[card.suit]
    let image_url = ""; 

    if (card.number == 10) {
        image_url = face_card_urls[0][card.suit];
    } else if (card.number == 11) {
        image_url = face_card_urls[1][card.suit];
    } else if (card.number == 12) {
        image_url = face_card_urls[2][card.suit];
    }

    return (
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
    )
};