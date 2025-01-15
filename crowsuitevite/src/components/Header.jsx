import './Components.css'
import crowLogo from '../assets/crow.svg'

export default function Header() {
      return (
        <>
        <div className="header">
          <h1>Crowsuite Header</h1>
          <img src={crowLogo}></img>
        </div>
        </>
      );
    }; 