import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001')

const useChat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };

    }, []);

    const sendMessage = (message) => {
        socket.emit('chat message', message);
    };

    return { messages, sendMessage };
};

export default useChat;
