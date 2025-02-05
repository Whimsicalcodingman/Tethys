import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Ensure this matches Vercel's expected output directory
  },
  base: '/', // Ensures proper paths in the build output
});
