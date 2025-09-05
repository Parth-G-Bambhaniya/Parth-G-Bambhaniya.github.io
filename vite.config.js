import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Parth-G-Bambhaniya.github.io/', // 👈 Add this line
})
