import { render, screen, fireEvent } from '@testing-library/react';
import ChatBox from '../components/ChatBox';

describe('ChatBox Component', () => {
    test('Deve renderizar o input e enviar uma mensagem', () => {
        render(
            <ChatBox />
        )

        const input = screen.getByPlaceholderText('Digite uma mensagem.../i')
        fireEvent.change(input, { target: { value: 'Olá!' } });

        const sendButton = screen.getByText(/Enviar/i);
        fireEvent.click(sendButton);

        expect(screen.getByText('Olá!')).toBeInTheDocument();
    })
})