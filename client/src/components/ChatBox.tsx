import React, { useState } from "react";
import useChat from "../hooks/useChat";

const ChatBox: React.FC = () => {
    const { messages, sendMessage, userID } = useChat();
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
        <div className="container d-flex flex-column align-items-center vh-100">
            <div className="chat-box border rounded p-3 w-100 bg-secondary" style={{ maxWidth: '900px' }}>
                <ul className="list-unstyled message-list mb-3 overflow-auto" style={{ height: '70vh', wordWrap: 'break-word' }}>
                    {messages.map((element, index) => (
                        <li key={index}
                            className={`message p-2 mb-3 rounded ${element.sender === userID ? 'bg-dark text-white ms-auto' : 'bg-light text-body me-auto'}`}
                            style={{ maxWidth: 'fit-content', display: 'block' }}
                        >
                            <div>
                                <div className="message-sender" style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>Anônimo</div>
                                <span>{element.content}</span>
                                <span className="ms-2" style={{ fontSize: '0.8rem' }}>{element.timestamp}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className="d-flex">
                    <input value={inputMessage}
                        onChange={handleChange}
                        placeholder="Digite uma mensagem..."
                        className="form-control me-2"
                    ></input>
                    <button type="submit" className="btn btn-light">Enviar</button>
                </form>
            </div>
        </div>

    )
}

export default ChatBox;