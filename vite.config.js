import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // For user or organization pages
  build: {
    outDir: 'dist', // Ensure this matches your build output directory
  },
});
