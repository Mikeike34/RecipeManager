import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  server: { //now whenever we visit /api, it will be prefixed with http://localhost:5000
    port: 5000,
    proxy:{
      "/api":{
        target: "http://localhost:5000"
      }
    }
  }
})
