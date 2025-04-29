import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      test: fileURLToPath(new URL('./test', import.meta.url)),
    },
  },
})
