import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Ensure this matches Vercel's expectations
  },
  base: '/', // Ensure this is set for proper asset resolution
});
