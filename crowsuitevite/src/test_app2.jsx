import { useState, useEffect } from 'react'
import { socket } from './socket.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './components/testFront.jsx'
import GamePage from './components/testGame.jsx'

function App2() {
  // for tracking state of game
  const [testState, setTestState] = useState(false); 
  const [pNum, setPNum] = useState(0)

  // for events that happen after each render
  useEffect(() => {
    socket.on('connect', () => {
    changeTest;
    });

    return(() => {
    socket.off('connect', changeTest);
    })
  }, []);

  useEffect(() => {
    socket.on('updatePlayerNumber', (num) => {
        console.log(num); 
        setPNum(num); 
    })
}, []);

  // for events/functions that react to the DOM
  function changeTest() {
    let currentTestState = testState;
    currentTestState = !currentTestState; 
    setTestState(currentTestState);
  }

  if (pNum == -1) {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/game" element={<GamePage />} />
                </Routes>
            </BrowserRouter>
        </>
    ) 
  } else if (pNum % 2 == 0) {
    return(
        <FrontPage></FrontPage>
    )
  } else {
    return(
        <GamePage></GamePage>
    )
  }
};



export default App2
