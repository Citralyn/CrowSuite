import { io } from 'socket.io-client';

//change from local host to private ip for testing purposes (SPOT 1)
//export const socket = io('https://crowsuite.onrender.com');
export const socket = io('http://localhost:5174');