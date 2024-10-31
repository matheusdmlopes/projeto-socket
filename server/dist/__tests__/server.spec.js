"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const node_http_1 = require("node:http");
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("../socket"));
require("../server");
require("../socket");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
function waitFor(socket, event) {
    return new Promise((resolve) => {
        socket.once(event, resolve);
    });
}
(0, vitest_1.describe)("Socket.IO Server", () => {
    let io, serverSocket, clientSocket, clientSocket2;
    (0, vitest_1.beforeAll)(() => {
        return new Promise((resolve) => {
            const httpServer = (0, node_http_1.createServer)();
            io = new socket_io_1.Server(httpServer);
            (0, socket_1.default)(io);
            httpServer.listen(() => {
                const port = httpServer.address().port;
                // Inicializando dois clientes conectados ao servidor
                clientSocket = (0, socket_io_client_1.io)(`http://localhost:${port}`);
                clientSocket2 = (0, socket_io_client_1.io)(`http://localhost:${port}`);
                clientSocket.on("connect", () => {
                    clientSocket2.on("connect", resolve);
                });
                io.on("connection", (socket) => {
                    serverSocket = socket;
                });
            });
        });
    });
    (0, vitest_1.afterAll)(() => {
        io.close();
        clientSocket.disconnect();
        clientSocket2.disconnect();
    });
    (0, vitest_1.it)('deve retornar "Servidor rodando."', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.server).get('/');
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.text).toBe("Servidor rodando.");
    }));
    (0, vitest_1.it)("deve conectar um cliente e emitir o evento de usuários online", () => {
        clientSocket.on("users online", (count) => {
            (0, vitest_1.expect)(count).toBe(1);
        });
    });
    (0, vitest_1.it)("deve conectar um segundo cliente e emitir o evento de usuários online", () => {
        clientSocket2.on("users online", (count) => {
            (0, vitest_1.expect)(count).toBe(2);
        });
    });
    (0, vitest_1.it)("deve enviar uma mensagem do cliente e emitir para todos os clientes", () => __awaiter(void 0, void 0, void 0, function* () {
        const messageContent = "Hello, world!";
        const fixedDate = new Date('2024-10-28T12:00:00');
        vitest_1.vi.setSystemTime(fixedDate);
        const expectedTimestamp = fixedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        clientSocket.emit("chat message", messageContent);
        const message = yield waitFor(clientSocket2, "chat message");
        (0, vitest_1.expect)(message.content).toBe(messageContent);
        (0, vitest_1.expect)(message.sender).toBe(clientSocket.id);
        (0, vitest_1.expect)(message.timestamp).toBe(expectedTimestamp);
    }));
    (0, vitest_1.it)("deve desconectar um cliente e emitir o evento de usuários online", () => {
        clientSocket2.on("disconnect", () => {
            clientSocket.on("users online", (count) => {
                (0, vitest_1.expect)(count).toBe(1);
            });
        });
        clientSocket2.disconnect();
    });
    (0, vitest_1.it)("deve emitir uma mensagem de desconexão e diminuir contagem de usuários", () => {
        clientSocket.on("disconnect", () => {
            clientSocket2.on("users online", (count) => {
                (0, vitest_1.expect)(count).toBe(0);
            });
        });
        clientSocket.disconnect();
    });
});
