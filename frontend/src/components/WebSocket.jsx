import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { ACCESS_TOKEN } from '../constants';



const Socket = () => {
    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io("http://127.0.0.1:8000", {
            withCredentials: true,
        })
        

        // Setup event listeners
        socket.on('connect', () => {
            console.log('Connected to server.');
            const token = localStorage.getItem(ACCESS_TOKEN);
            socket.emit('authenticate', { token });
        });


        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
        });

        socket.on('authenticated', () => {
            console.log('authenticated')
        })

        socket.on('send_message', (data) => {
            console.log(`message received ${data.message} `)
            return 'success'
          });

        // Cleanup on component unmount
        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Socket.IO in React</h1>
        </div>
    );
};

export default Socket;