import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";
import socketHandler from "../socket";
import "../server";
import request from 'supertest';
import { server } from "../server";

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
    return new Promise((resolve) => {
        socket.once(event, resolve);
    });
}

describe("Socket.IO Server", () => {
    let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket, clientSocket2: ClientSocket;


    beforeAll(() => {
        return new Promise<void>((resolve) => {
            const httpServer = createServer();
            io = new Server(httpServer);

            socketHandler(io);

            httpServer.listen(() => {
                const port = (httpServer.address() as AddressInfo).port;

                // Inicializando dois clientes conectados ao servidor
                clientSocket = ioc(`http://localhost:${port}`);
                clientSocket2 = ioc(`http://localhost:${port}`);

                clientSocket.on("connect", () => {
                    clientSocket2.on("connect", resolve);
                });

                io.on("connection", (socket) => {
                    serverSocket = socket;
                });
            });
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.disconnect();
        clientSocket2.disconnect();
    });

    it('deve retornar "Servidor rodando."', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe("Servidor rodando.");
    });

    it("deve conectar um cliente e emitir o evento de usuários online", () => {
        clientSocket.on("users online", (count) => {
            expect(count).toBe(1);
        });
    });

    it("deve conectar um segundo cliente e emitir o evento de usuários online", () => {
        clientSocket2.on("users online", (count) => {
            expect(count).toBe(2);
        });
    });



    it("deve desconectar um cliente e emitir o evento de usuários online", () => {
        clientSocket2.on("disconnect", () => {
            clientSocket.on("users online", (count) => {
                expect(count).toBe(1);
            });
        });
        clientSocket2.disconnect();
    });

    it("deve emitir uma mensagem de desconexão e diminuir contagem de usuários", () => {
        clientSocket.on("disconnect", () => {
            clientSocket2.on("users online", (count) => {
                expect(count).toBe(0);
            });
        });
        clientSocket.disconnect();
    });
});
