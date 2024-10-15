import { useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';
import { Message } from "../types/message";


const SERVER_URL = import.meta.env.VITE_BACKEND_URL

const socket: Socket = io(SERVER_URL);

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        socket.on('connect', () => {
            if (socket.id) {
                setUserId(socket.id);
                console.log(`Conectado com o ID: ${socket.id}`);
            }
        })

        socket.on('chat message', (msg: Message) => {
            // Mensagem recebida do back-end no front-end
            setMessages((prevMessages) => [...prevMessages, msg]);
        })

        return () => {
            socket.off('chat message')
        }
    }, [])

    const sendMessage = (message: string) => {
        if (userId) {
            //Mensagem enviada do front end pro back-end
            socket.emit('chat message', message);
        }
    }

    return { messages, sendMessage, userId }
}

export default useChat;