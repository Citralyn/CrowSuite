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
    const [gamePage, setGamePage] = useState(0);
    const [gNum, setGNum] = useState(0); 
    const [pNum, setPNum] = useState(0);
  
    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id)
            console.log("CLIENT CONNECTED.")
        });
  
        return(() => {
            socket.off('connect', () => {
                console.log("CLIENT DISCONNECTED.")
            })
        }); 
    }, []);
  
    useEffect(() => {
        socket.on('addPlayerInformation', (gameNumber, playerNumber) => {
                setGNum(gameNumber);
                setPNum(playerNumber); 
            console.log(`Received ${gameNumber} and ${gameNumber}`); 
        });

        socket.on('readyToStart', () => {
            setGamePage(3); 
        })
    }, []);


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
                <LoginPage playerSocket={socket} playerNumber={pNum}></LoginPage>
            </>
        )
    } else if (gamePage == 2) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <WaitingRoomPage></WaitingRoomPage>
            </>
        )
    } else if (gamePage == 3) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>{gNum} game, button for {pNum}</button>
                <GamePage></GamePage>
            </>
        )
    } else if (gamePage == 4) {
        return(
            
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <ResultsPage></ResultsPage>
            </>
        )
    } else if (gamePage == 5) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage()}}>button for {pNum}</button>
                <TutorialPage></TutorialPage>
            </>
        )
    } 
};
  
  
  
export default App3
  