import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — relative asset paths, so the built site works on GitHub Pages
// (https://<user>.github.io/<repo>/) as well as any static host.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
