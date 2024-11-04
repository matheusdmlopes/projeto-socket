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

        const userID = socket.handshake.query.userID as string;
        const userAgent = socket.handshake.headers['user-agent'];
        const connectedAt = new Date().toISOString();

        connectedUsers.push({ id: userID, userAgent, connectedAt })
        onlineUsers++;

        console.log(`usuário conectado: ${userID}`);

        io.emit('users online', onlineUsers);

        console.log('Usuários atualmente conectados:', connectedUsers);

        socket.on('chat message', (content: string) => {
            // mensagem recebida do front-end no back-end e emitida pro front-end novamente
            const timestamp = new Date().toISOString();
            const msg = { sender: userID, content, timestamp }
            io.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            connectedUsers = connectedUsers.filter(user => user.id !== userID);
            onlineUsers--;
            console.log(`usuário desconectado: ${userID}`);
            console.log('Usuários atualmente conectados:', connectedUsers);
            io.emit('users online', onlineUsers);
        })
    })

}

export default socketHandler;

// FLUXO DO SOCKET: Front-end faz um socket.emit, o socket captura no back com um socket.on, que envia a mensagem pra todos com um io.emit e o front captura