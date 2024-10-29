import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.ts'],  // Inclui todos os arquivos .ts da pasta src para cobertura de testes
            exclude: ['**/__tests__/**', '**/node_modules/**'], // Exclui arquivos de testes e node_modules
        },
    },
});
