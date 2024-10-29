import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ChatBox from '../components/ChatBox';
import useChat from '../hooks/useChat';

/// <reference types="vitest" />

vi.mock('../hooks/useChat');

const mockUseChat = useChat as ReturnType<typeof vi.fn>;

describe("ChatBox", () => {

    beforeEach(() => {
        mockUseChat.mockReturnValue({
            messages: [],
            sendMessage: vi.fn(),
            userId: 'testUser',
        });
    });

    test('Deve renderizar a chatBox corretamente', () => {
        render(<ChatBox />)
        const input = screen.getByPlaceholderText('Digite uma mensagem...');
        const button = screen.getByText('Enviar');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })

    test('Deve permitir o envio de mensagens corretamente', () => {
        render(<ChatBox />);
        const input = screen.getByPlaceholderText('Digite uma mensagem...');
        const button = screen.getByText('Enviar');

        fireEvent.change(input, { target: { value: 'Olá, mundo!' } });
        fireEvent.click(button);

        expect(mockUseChat().sendMessage).toHaveBeenCalledWith('Olá, mundo!');

        mockUseChat.mockReturnValue({
            messages: [{ sender: 'testUser', content: 'Olá, mundo!', timestamp: '10:10' }],
            sendMessage: vi.fn(),
            userId: 'testUser',
        });

        render(<ChatBox />);

        expect(screen.getByText('Olá, mundo!')).toBeInTheDocument();
        expect(screen.getByText('10:10')).toBeInTheDocument();
        expect(screen.getByText('Anônimo')).toBeInTheDocument();
    })
})

