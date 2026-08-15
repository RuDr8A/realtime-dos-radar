import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const BACKEND_URL = "http://localhost:3000";

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const socket = io(BACKEND_URL);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on('new-attack', (data) => {
      setAttacks((prev) => [data, ...prev].slice(0, 15)); 
    });

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, attacks }}>
      {children}
    </SocketContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);