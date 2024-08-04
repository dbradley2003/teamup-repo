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
    const newSocket = io(SOCKET_SERVER_URL, {
      query: { token: token },
    });
    setSocket(newSocket);

    // Cleanup on component unmount
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};