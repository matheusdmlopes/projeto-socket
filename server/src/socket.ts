import { Server, Socket } from 'socket.io';

const socketHandler = (io: Server) => {

    io.on('connection', (socket: Socket) => {
        console.log("user connected")

        socket.on('chat message', (msg: string) => {
            io.emit('chat message', msg);
        })

        socket.on('disconnect', () => {
            console.log("user disconnected");
        })
    })

}

export default socketHandler;