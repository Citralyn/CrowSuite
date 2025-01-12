export default function LoginPage({playerSocket, playerNumber}) { 

  function sayHi() {
    console.log(playerSocket.id)
    playerSocket.emit('helloToServer', playerNumber);
  }

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <button onClick={() => {sayHi()}}>Message</button>
    </>
  );
}; 