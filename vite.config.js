import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://decoded-app-dsg9skc27-yunifps-projects.vercel.app'
    }
  }
})