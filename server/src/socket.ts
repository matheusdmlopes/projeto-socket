import { Server, Socket } from 'socket.io';

const socketHandler = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        console.log(`usuário conectado: ${socket.id}`)

        socket.on('chat message', (content: string) => {
            // mensagem recebida do front-end no back-end e emitida pro front-end novamente
            const msg = { sender: socket.id, content: content }
            // io.emit('chat message', msg);
            socket.broadcast.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            console.log(`usuário desconectado: ${socket.id}`);
        })
    })

}

export default socketHandler;

// FLUXO DO SOCKET: Front-end faz um socket.emit, o socket captura no back com um socket.on, que envia a mensagem pra todos com um io.emit e o front captura