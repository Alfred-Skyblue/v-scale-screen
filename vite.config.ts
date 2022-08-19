import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'package/index.ts'),
      name: 'VScaleScreen',
      formats: ['es', 'iife', 'umd', 'cjs'],
      fileName: 'v-scale-screen'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue(), dts({ outputDir: 'dist/types' })]
})
