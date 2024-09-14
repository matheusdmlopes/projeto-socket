import React, { useState, } from 'react';
import './Chat.css';
import useChat from './hooks/useChat';


const Chat = () => {
    const { messages, sendMessage } = useChat();
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h1>Real-time Chat</h1>
            <ul className="message-list">
                {messages.map((element, index) => (
                    <li key={index} className="message">{element}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    autoComplete="off"
                    className="message-input"
                    placeholder="Digite uma mensagem..."
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;
