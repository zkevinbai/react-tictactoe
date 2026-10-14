import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://zkevinbai.github.io/react-tictactoe/ via gh-pages
export default defineConfig({
  plugins: [react()],
  base: '/react-tictactoe/',
  build: {
    outDir: 'build',
  },
})
