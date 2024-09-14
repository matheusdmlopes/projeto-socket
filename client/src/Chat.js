import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {

        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            socket.emit('chat message', inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div>
            <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
