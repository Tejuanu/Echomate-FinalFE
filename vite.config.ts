/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "service": path.resolve(__dirname, "src/service"),
      "layout": path.resolve(__dirname, "src/layout"),
      "utils": path.resolve(__dirname, "src/utils"),
      "assets": path.resolve(__dirname, "src/assets"),
      "routes": path.resolve(__dirname, "src/routes"),
      "theme": path.resolve(__dirname, "src/theme"),
      "pages": path.resolve(__dirname, "src/pages"),
      "global": path.resolve(__dirname, "src/components/global"),
    }
  },
  "build": {
    outDir: "build"
  }
})
