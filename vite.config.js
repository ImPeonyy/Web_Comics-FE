import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    }
});
