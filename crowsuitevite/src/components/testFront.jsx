import { useState } from 'react';

export default function FrontPage() {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        // Simulate login and save the user data to localStorage or context
        localStorage.setItem('user', JSON.stringify({ username }));
    };

      return (
        <>
        <h1>FRONT PAGE</h1>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
        </>
        
      );
    }; 