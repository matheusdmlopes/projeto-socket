import React, { useState } from "react";
import useChat from "../hooks/useChat";
import '../styles/ChatBox.css';

const ChatBox: React.FC = () => {
    const { messages, sendMessage, userId } = useChat();
    const [inputMessage, setInputMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                <ul className="message-list">
                    {messages.map((element, index) => (
                        <li key={index}
                            className={`message ${element.sender === userId ? 'sent' : 'received'}`}>{element.content}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className="message-form">
                    <input value={inputMessage}
                        onChange={handleChange}
                        placeholder="Digite uma mensagem..."
                        className="message-input"
                    ></input>
                    <button type="submit" className="send-button">Enviar</button>
                </form>
            </div>
        </div>

    )
}

export default ChatBox;