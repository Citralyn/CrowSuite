import '../css/Pages.css'

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

export default function FrontPage({changePageFunction}) { 

  function handleClick(i) {
    changePageFunction(i); 
  }
  
  return (
    <>
    <div className="coolArt">
      <div className="royalty">
        <img src={seagullJack}></img>
        <img src={crowQueen}></img>
        <img src={pigeonKing}></img>
      </div>
    </div>
    <div className="frontPageButtons">
      <button onClick={() => {handleClick(1)}}>play</button>
      <button onClick={() => {handleClick(5)}}>how 2 play</button>
    </div>
    </>
  );
}; 