import React, { useEffect } from 'react';
import { useSocket } from './SocketContext';


const Socket = () => {
    const socket = useSocket();
    useEffect(() => {
        

        socket.on('send_message', (data) => {
            console.log(`message received ${data.message} `)
            return 'success'
          });

        
    }, []);

    return (
        <div>
            <h1>Socket.IO in React</h1>
        </div>
    );
};

export default Socket;