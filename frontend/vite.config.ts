import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // During development, proxy API and WebSocket requests to the backend.
    // This means your browser can talk to http://localhost:5000/api/...
    // and Vite silently forwards it to http://localhost:4000.
    // No CORS errors, no port mismatch.
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true, // WebSocket proxying
      },
    },
  },
});
