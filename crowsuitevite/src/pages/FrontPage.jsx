import './Pages.css'

export default function FrontPage({changePageFunction}) { 

  function handleClick(i) {
    changePageFunction(i); 
  }
  
  return (
  <div className="frontPageButtons">
    <button onClick={() => {handleClick(1)}}>play</button>
    <button onClick={() => {handleClick(5)}}>how 2 play</button>
  </div>
  );
}; 