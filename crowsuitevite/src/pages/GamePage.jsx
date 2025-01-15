import './Pages.css'

export default function GamePage() { return (
  <>
    <h1>GAME PAGE</h1>
    <div className="generalFlexContainer">
      <div className="staticGameContent">
        <div className="Deck">
          <h1>asdfsdf</h1>
          <h2>asdkfsd</h2>
        </div>
        <div className="TopPlayer">
          <h1>top player</h1>
        </div>
        <div className="LeftPlayer">
          <h1>left player</h1>
        </div>
        <div className="RightPlayer">
        <h1>rightplayer</h1>
        </div>
      </div>
    </div>
    
    <div className="personalizedGameContent">
      <h1>Cards Go Here</h1>
    </div>
  </>
    
  );
}; 