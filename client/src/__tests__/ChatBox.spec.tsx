import { render, screen } from '@testing-library/react';
import ChatBox from '../components/ChatBox';


describe("ChatBox", () => {
    test('demo', () => {
        render(<ChatBox />)

        expect(screen.getByText('Enviar')).toBeInTheDocument();
    })
})

// test('demo', () => {
//     expect(true).toBe(true)
// })

// describe('ChatBox Component', () => {
//     test('Deve renderizar o input e enviar uma mensagem', () => {
//         render(
//             <ChatBox />
//         )

//         const input = screen.getByPlaceholderText('Digite uma mensagem.../i')
//         fireEvent.change(input, { target: { value: 'Olá!' } });

//         const sendButton = screen.getByText(/Enviar/i);
//         fireEvent.click(sendButton);

//         expect(screen.getByText('Olá!'))
//     })
// })

