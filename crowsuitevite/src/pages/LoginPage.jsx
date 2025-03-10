import { useState } from 'react'
import '../css/Pages.css'

export default function LoginPage({playerSocket, changePageFunction}) { 
  const [username, setUsername] = useState(""); 

  function update(user) {
    playerSocket.emit('addNewPlayer', user);
    changePageFunction(2); 
  }

  return (
    <>

      <div className="generalFlexContainer">
        <div className="loginPage">
          <label>
            <p>Username</p>
            <input id="username" type="text" placeholder="John Smith" onChange={e => setUsername(e.target.value)}/>
          </label>
          <div>
            <button type="submit" onClick={() => {update(username)}}>Enter</button>
          </div>
        </div>
      </div>
      
    </>
  );
}; 