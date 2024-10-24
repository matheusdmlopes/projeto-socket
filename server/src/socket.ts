import { timeStamp } from 'console';
import { Server, Socket } from 'socket.io';

let onlineUsers = 0;

const socketHandler = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        onlineUsers++;
        console.log(`usuário conectado: ${socket.id}`)

        io.emit('users online', onlineUsers);

        socket.on('chat message', (content: string) => {
            // mensagem recebida do front-end no back-end e emitida pro front-end novamente
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const msg = { sender: socket.id, content, timestamp }
            io.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            onlineUsers--;
            console.log(`usuário desconectado: ${socket.id}`);

            io.emit('users online', onlineUsers);
        })
    })

}

export default socketHandler;

// FLUXO DO SOCKET: Front-end faz um socket.emit, o socket captura no back com um socket.on, que envia a mensagem pra todos com um io.emit e o front captura