import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3030,
    host: '0.0.0.0',
    allowedHosts: ['.kirken.xyz'],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['.kirken.xyz'],
  }
})
