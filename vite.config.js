import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/gate-prep-app/',
  plugins: [react()],
  build: {
    outDir: 'docs', // ← send build output to docs/ instead of dist/
  },
});
