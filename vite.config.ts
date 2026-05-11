import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    strictPort: true,
    allowedHosts: [
      '47.102.36.175',
      '10.144.18.66',
      '10.144.18.88',
      'localhost',
      '.tmytimidly.com',
    ],
    hmr: {
      host: '47.102.36.175',
      clientPort: 8888,
      protocol: 'wss',
    },
  },
})
