import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Pisahkan library eksternal
          if (id.includes('node_modules')) {
            // Chunk spesifik untuk library utama
            if (id.includes('vue') || id.includes('vue-router')) return 'vue-vendor'
            if (id.includes('tailwindcss')) return 'tailwind-vendor'

            // Chunk umum untuk library lain
            return 'vendor'
          }
        },
      },
    },
    // Batasan ukuran chunk (KB)
    chunkSizeWarningLimit: 700,

    // Kompresi tambahan
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimasi performa
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@intlify/unplugin-vue-i18n'],
  },
})
