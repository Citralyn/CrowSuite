import './Pages.css'

export default function FrontPage({changePageFunction}) { 

  function handleClick(i) {
    changePageFunction(i); 
  }
  
  return (
    <>
    <h1>Front Page</h1>
    <div className="frontPageButtons">
      <button onClick={() => {handleClick(1)}}>play</button>
      <button onClick={() => {handleClick(5)}}>how 2 play</button>
    </div>
    </>
  );
}; 