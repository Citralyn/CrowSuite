import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(
  {
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        //change from local host to private ip for testing purposes (SPOT 2)
        target: 'https://crowsuite.onrender.com:5174',
        ws: true,
        rewriteWsOrigin: true,
      },
    }
  }
},
{
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),          // Entry point for HTML
        js: resolve(__dirname, 'src/main.jsx'),          // Entry point for main JSX file
      },
    },
  },
}
)
