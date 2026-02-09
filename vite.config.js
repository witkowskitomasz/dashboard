import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 30127, // Tutaj ustawiasz swój port
    strictPort: true, // Jeśli port 3000 zajęty, Vite nie będzie szukał kolejnego wolnego
    allowedHosts: [
      'hanna127.mikrus.xyz' // Tutaj dodajesz swoją domenę z Mikrusa
    ]
  }
})
