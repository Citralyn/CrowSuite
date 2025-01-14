import { useState } from 'react'

export default function LoginPage({playerSocket, changePageFunction}) { 
  const [username, setUsername] = useState(""); 

  function update(user) {
    playerSocket.emit('addNewPlayer', user);
    changePageFunction(2); 
  }

  return (
    <>
      <h1>LOGIN PAGE</h1>

        <label>
          <p>Username</p>
          <input id="username" type="text" placeholder="John Smith" onChange={e => setUsername(e.target.value)}/>
        </label>
        <div>
          <button type="submit" onClick={() => {update(username)}}>Enter</button>
        </div>
    </>
  );
}; 