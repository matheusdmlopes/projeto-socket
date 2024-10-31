import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import socketHandler from './socket';

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://projeto-socket.vercel.app/",
        methods: ["GET", "POST"]
    }
})


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor rodando.")
})

socketHandler(io);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

export { server };