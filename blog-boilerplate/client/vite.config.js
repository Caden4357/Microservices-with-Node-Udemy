import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    allowedHosts: ['localhost', '127.0.0.1', 'posts.com']
  }
})
