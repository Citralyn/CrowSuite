import '../css/Pages.css'

export default function ResultsPage({winner}) { 
  return (
    <div className="generalFlexContainer">
      <div className="results">
        <h2>{winner} won! :D</h2>
      </div>
    </div>
    
  );
}; 