import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import ChatBox from '../components/ChatBox';

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<ChatBox />)
    expect(true).toBeTruthy()
})

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

