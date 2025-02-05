import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Ensure this matches the distDir in vercel.json
  },
  base: '/', // Set base to root for correct asset linking
});
