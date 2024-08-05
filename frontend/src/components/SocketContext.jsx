import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ACCESS_TOKEN } from '../constants';

const SOCKET_SERVER_URL = "http://127.0.0.1:8000"; // Replace with your server URL

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('Token retrieved:', token); // Debugging

    if (!token) {
      console.error('No token found. Cannot establish socket connection.');
      return;
    }
    
      const newSocket = io(SOCKET_SERVER_URL);
      
      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        newSocket.emit('authenticate', {token})
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server.');
    });

      newSocket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
      });

      newSocket.on('error', (err) => {
        console.error('Socket Error:', err.message);
      });

      setSocket(newSocket);

      // Cleanup on component unmount
      return () => {
        if (newSocket) newSocket.close();
      };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};