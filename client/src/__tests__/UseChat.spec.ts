import { renderHook, act } from '@testing-library/react';
import useChat from '../hooks/useChat';
import { vi } from 'vitest';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types/message';

interface MockSocket extends Partial<Socket> {
    on: ReturnType<typeof vi.fn>;
    emit: ReturnType<typeof vi.fn>;
    off: ReturnType<typeof vi.fn>;
}

vi.mock('socket.io-client', () => {
    const mockSocket: MockSocket = {
        on: vi.fn(),
        emit: vi.fn(),
        off: vi.fn(),
        id: 'mockUserId',
    };
    return { io: () => mockSocket };
});

describe("useChat Hook", () => {
    let mockSocket: MockSocket;

    beforeEach(() => {
        mockSocket = io() as unknown as MockSocket;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("configura o userId ao conectar", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            const connectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'connect')?.[1];
            if (connectHandler) connectHandler();
        });

        expect(result.current.userID).toBe('mockUserId');
    });

    test("adiciona uma mensagem ao receber 'chat message'", () => {
        const { result } = renderHook(() => useChat());
        const newMessage: Message = { sender: 'user123', content: 'Hello!', timestamp: '10:10' };

        act(() => {
            const messageHandler = mockSocket.on.mock.calls.find(call => call[0] === 'chat message')?.[1];
            if (messageHandler) messageHandler(newMessage);
        });

        expect(result.current.messages).toContainEqual(newMessage);
    });

    test("atualiza o número de usuários online", () => {
        const { result } = renderHook(() => useChat());
        const onlineUsersCount = 5;

        act(() => {
            const usersOnlineHandler = mockSocket.on.mock.calls.find(call => call[0] === 'users online')?.[1];
            if (usersOnlineHandler) usersOnlineHandler(onlineUsersCount);
        });

        expect(result.current.onlineUsers).toBe(onlineUsersCount);
    });

    test("deve chamar socket.emit com 'chat message' e a mensagem correta", () => {
        const { result } = renderHook(() => useChat());

        act(() => {
            const connectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'connect')?.[1];
            if (connectHandler) connectHandler();
        });

        act(() => {
            result.current.sendMessage('Hello');
        });

        expect(mockSocket.emit).toHaveBeenCalledWith('chat message', 'Hello');
    });
});
