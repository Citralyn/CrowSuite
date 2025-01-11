import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        //change from local host to private ip for testing purposes (SPOT 2)
        target: 'http://localhost:5174',
        ws: true,
        rewriteWsOrigin: true,
      },
    }
  }

})
