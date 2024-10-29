import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';


vi.mock('../components/Header', () => {
    return {
        default: () => <div>Mocked Header</div>
    }
})

vi.mock('../components/ChatBox', () => {
    return {
        default: () => <div>Mocked ChatBox</div>
    }
})

describe('App', () => {
    test("Deve renderizar os componentes Header e ChatBox corretamente", () => {
        render(<App />);

        expect(screen.getByText('Mocked Header')).toBeInTheDocument();
        expect(screen.getByText('Mocked ChatBox')).toBeInTheDocument();

    })

})