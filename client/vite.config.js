import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  define:{
    "process.env":{
      VITE_BACKEND_URL :process.env.VITE_BACKEND_URL,
      VITE_FRONTEND_URL_LOCAL :process.env.VITE_FRONTEND_URL_LOCAL,
    }
  },
  plugins: [react(),
    tailwindcss()
  ],
})
