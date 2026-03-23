import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('three') || id.includes('@react-three')) return 'three';
                        if (id.includes('framer-motion') || id.includes('motion')) return 'motion';
                        if (id.includes('gsap')) return 'gsap';
                        if (id.includes('ogl')) return 'ogl';
                    }
                },
            },
        },
    },
});
