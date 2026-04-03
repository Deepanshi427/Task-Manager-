// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Forces Vite to stay on your primary port
    strictPort: true, // If 5173 is busy, it won't jump to 5174; it will tell you why
    host: true       // Useful if you want to test on mobile/network later
  },
  optimizeDeps: {
    force: true      // This helps clear those "Re-optimizing dependencies" memory crashes
  }
})