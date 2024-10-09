import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

const App: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    })
  })

}