import { useState, useEffect } from 'react'
import { socket } from './socket.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import FrontPage from './pages/FrontPage.jsx'
import GamePage from './pages/GamePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import TutorialPage from './pages/TutorialPage.jsx'
import WaitingRoomPage from './pages/WaitingRoomPage.jsx'
import './css/Main.css'

function App() {
    const [gamePage, setGamePage] = useState(0);
    const [gameWinner, setGameWinner] = useState("temp");
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
            setGameWinner(winner); 
            setGamePage(4); 
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
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <FrontPage changePageFunction={changeGamePage}></FrontPage>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(gamePage + 1)}}>NEXT</button>
                </div>
            </>
        )
    } else if (gamePage == 1) {
        return(
            <>
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <LoginPage playerSocket={socket} changePageFunction={changeGamePage}></LoginPage>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(gamePage + 1)}}>NEXT</button>
                </div>
            </>
        )
    } else if (gamePage == 2) {
        return(
            <>
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <WaitingRoomPage playerSocket={socket} gameNumber={gNum}></WaitingRoomPage>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(gamePage + 1)}}>NEXT</button>
                </div>
            </>
        )
    } else if (gamePage == 3) {
        return(
            <>
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <GamePage playerSocket={socket} gameNumber={gNum} playerNumber={pNum}></GamePage>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(gamePage + 1)}}>NEXT</button>
                </div>
            </>
        )
    } else if (gamePage == 4) {
        return(
            
            <>
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <ResultsPage winner={gameWinner}></ResultsPage>
                <div className="playAgain">
                    <button onClick={() =>{changeGamePage(0)}}>Play Again?</button>
                </div>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(gamePage + 1)}}>NEXT</button>
                </div>
            </>
        )
    } else if (gamePage == 5) {
        return(
            <>
                <ProgressBar now={gamePage * 20}></ProgressBar>
                <TutorialPage></TutorialPage>
                <div className="cheatButton">
                    <button onClick={() =>{changeGamePage(0)}}>NEXT</button>
                </div>
            </>
        )
    } 
};
  
  
  
export default App
  