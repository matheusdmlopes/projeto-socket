import { Server, Socket } from 'socket.io';

interface ConnectedUser {
    id: string,
    userAgent: string | undefined,
    connectedAt: string,
}

let connectedUsers: ConnectedUser[] = [];
let onlineUsers = 0;

const socketHandler = (io: Server) => {

    io.on('connection', (socket: Socket) => {

        const userAgent = socket.handshake.headers['user-agent'];
        const connectedAt = new Date().toISOString();

        connectedUsers.push({ id: socket.id, userAgent, connectedAt })
        onlineUsers++;

        console.log(`usuário conectado: ${socket.id}, UserAgent: ${userAgent} `);

        io.emit('users online', onlineUsers);

        console.log('Usuários atualmente conectados:', connectedUsers);

        socket.on('chat message', (content: string) => {
            // mensagem recebida do front-end no back-end e emitida pro front-end novamente
            const timestamp = new Date().toISOString();
            const msg = { sender: socket.id, content, timestamp }
            io.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            connectedUsers = connectedUsers.filter(user => user.id !== socket.id);
            onlineUsers--;
            console.log(`usuário desconectado: ${socket.id}`);
            console.log('Usuários atualmente conectados:', connectedUsers);
            io.emit('users online', onlineUsers);
        })
    })

}

export default socketHandler;

// FLUXO DO SOCKET: Front-end faz um socket.emit, o socket captura no back com um socket.on, que envia a mensagem pra todos com um io.emit e o front captura