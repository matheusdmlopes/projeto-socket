import React from "react";
import '../styles/Header.css'
import useChat from "../hooks/useChat";

const Header: React.FC = () => {
    const { onlineUsers } = useChat();

    return (
        <header className="bg-dark text-white text-center py-3">
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-0">CHAT GLOBAL</h1>
                <div className="d-flex align-items-center mt-2">
                    {/* Bolinha verde com Bootstrap */}
                    <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                    <p className="mb-0">{onlineUsers} {onlineUsers === 1 ? "usuário online" : "usuários online"}</p>
                </div>
            </div>
        </header>
    )
}

export default Header;