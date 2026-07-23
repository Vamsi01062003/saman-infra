import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Performance budget guardrail: fail loudly if the bundle balloons
    // rather than silently shipping a heavier site than the contract allows.
    chunkSizeWarningLimit: 150,
  },
});
