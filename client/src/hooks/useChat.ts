import { useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://192.168.x.x:3001');

const useChat = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on('chat message', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        })

        return () => {
            socket.off('chat message')
        }
    })

    const sendMessage = (message: string) => {
        socket.emit('chat message', message);
    }

    return { messages, sendMessage }
}

export default useChat;