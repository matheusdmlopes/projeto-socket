import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})