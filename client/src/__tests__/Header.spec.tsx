import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
    test("Deve renderizar o Header corretamente", () => {
        render(<Header />);
        const headerText = screen.getByText('CHAT GLOBAL');
        const usersOnline = screen.getByText('0 usuários online');

        expect(headerText).toBeInTheDocument();
        expect(usersOnline).toBeInTheDocument();
    })

})