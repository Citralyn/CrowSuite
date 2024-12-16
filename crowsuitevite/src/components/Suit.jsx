import crowLogo from '../assets/crow.svg'
import duckLogo from '../assets/duck.svg'
import pigeonLogo from '../assets/pigeon.svg'
import seagullLogo from '../assets/seagull.svg'

const image_urls = {
  "pigeon": pigeonLogo,
  "duck": duckLogo,
  "seagull": seagullLogo,
  "crow": crowLogo
}

export default function Suit({suit_index}) {
  console.log({suit_index})
    return (
      <img
        src={image_urls[suit_index]}
      />
    );
  }; 