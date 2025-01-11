import { useState, useEffect } from 'react'
import { socket } from './socket.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FrontPage from './pages/FrontPage.jsx'
import GamePage from './pages/GamePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import TutorialPage from './pages/TutorialPage.jsx'
import WaitingRoomPage from './pages/WaitingRoomPage.jsx'

function App3() {
    const [gamePage, setGamePage] = useState(0)
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

    function changeGamePage() {
        let currentGamePage = gamePage; 
        currentGamePage += 1; 
        if (currentGamePage == 6) {
            currentGamePage = 0; 
        }

        setGamePage(currentGamePage); 
    }

    if (gamePage == 0) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <FrontPage></FrontPage>
            </>
        )
    } else if (gamePage == 1) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <GamePage></GamePage>
            </>
        )
    } else if (gamePage == 2) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <LoginPage></LoginPage>
            </>
        )
    } else if (gamePage == 3) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <ResultsPage></ResultsPage>
            </>
        )
    } else if (gamePage == 4) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <TutorialPage></TutorialPage>
            </>
        )
    } else if (gamePage == 5) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <WaitingRoomPage></WaitingRoomPage>
            </>
        )
    }
};
  
  
  
export default App3
  