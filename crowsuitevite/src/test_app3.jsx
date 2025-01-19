import { useState, useEffect } from 'react'
//import { useContext, createContext } from 'react';
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
    //const SocketContext = createContext();
  
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
            console.log(`Received ${gameNumber} and ${playerNumber}`); 
        });

        socket.on('startGame', () => {
            setGamePage(3); 
        })
    }, []);

    useEffect(() => {
        socket.on("invalidPassOnStart", () => {
            alert("invalidPassOnStart"); 
        });
    
        socket.on("notYourTurn", () => {
            alert("notYourTurn"); 
        });
    
        socket.on("invalidAmount", () => {
            alert("invalidAmount"); 
        });
    
        socket.on("invalidCombination", () => {
            alert("invalidCombination"); 
        });
    
        socket.on("notHigherThanDeck", () => {
            alert("notHigherThanDeck"); 
        });
    
        socket.on("wrongAmount", () => {
            alert("wrongAmount"); 
        });
    
        socket.on("gameOver", (winner) => {
            alert(`gameOver, ${winner} won!`); 
        });

        return () => {
            socket.off("invalidPassOnStart");
            socket.off("notYourTurn");
            socket.off("invalidAmount");
            socket.off("invalidCombination");
            socket.off("notHigherThanDeck");
            socket.off("wrongAmount");
            socket.off("gameOver");
        };

    }, []);

    function changeGamePage(i) {
        setGamePage(i); 
    }

    if (gamePage == 0) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(gamePage + 1)}}>button for {pNum}</button>
                <FrontPage changePageFunction={changeGamePage}></FrontPage>
            </>
        )
    } else if (gamePage == 1) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(gamePage + 1)}}>button for {pNum}</button>
                <LoginPage playerSocket={socket} changePageFunction={changeGamePage}></LoginPage>
            </>
        )
    } else if (gamePage == 2) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(gamePage + 1)}}>button for {pNum}</button>
                <WaitingRoomPage playerSocket={socket} gameNumber={gNum}></WaitingRoomPage>
            </>
        )
    } else if (gamePage == 3) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(gamePage + 1)}}>{gNum} game, button for {pNum}</button>
                <GamePage playerSocket={socket} gameNumber={gNum} playerNumber={pNum}></GamePage>
            </>
        )
    } else if (gamePage == 4) {
        return(
            
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(gamePage + 1)}}>button for {pNum}</button>
                <ResultsPage></ResultsPage>
            </>
        )
    } else if (gamePage == 5) {
        return(
            <>
                <ProgressBar now={gamePage * 10}></ProgressBar>
                <button onClick={() => {changeGamePage(0)}}>button for {pNum}</button>
                <TutorialPage></TutorialPage>
            </>
        )
    } 
};
  
  
  
export default App3
  