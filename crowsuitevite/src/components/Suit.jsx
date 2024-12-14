import crowLogo from '../assets/crow.svg'
import duckLogo from '../assets/duck.svg'
import pigeonLogo from '../assets/pigeon.svg'
import seagullLogo from '../assets/seagull.svg'

const image_urls = [pigeonLogo, duckLogo, seagullLogo, crowLogo]

export default function Suit({suit_index}) {
    return (
      <img
        src={image_urls[suit_index]}
      />
    );
  }; 