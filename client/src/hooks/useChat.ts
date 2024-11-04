import { useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';
import { Message } from "../types/message";

function generateUniqueID() {
    return `user_${Math.random().toString(36).substr(2, 9)}`;
}

function getUserID() {
    let userID = localStorage.getItem('chat_user_id');

    if (!userID) {
        userID = generateUniqueID();
        localStorage.setItem('chat_user_id', userID);
    }

    return userID;
}

const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

const userID = getUserID();

const socket: Socket = io(SERVER_URL, {
    query: {
        userID: userID,
    }
});

const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    // const [userId, setUserId] = useState<string | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<number>(0)

    useEffect(() => {
        socket.on('connect', () => {
            if (userID) {
                console.log(`Conectado com o ID: ${userID}`);
            }
        })

        socket.on('chat message', (msg: Message) => {
            // Mensagem recebida do back-end no front-end
            const localTimestamp = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const localMsg = { ...msg, timestamp: localTimestamp };
            setMessages((prevMessages) => [...prevMessages, localMsg]);
        })

        socket.on('users online', (count: number) => {
            setOnlineUsers(count);
        })

        return () => {
            socket.off('chat message')
            socket.off('users online')
        }
    }, [])

    const sendMessage = (message: string) => {
        if (userID) {
            //Mensagem enviada do front end pro back-end
            socket.emit('chat message', message);
        }
    }

    return { messages, sendMessage, userID, onlineUsers }
}

export default useChat;