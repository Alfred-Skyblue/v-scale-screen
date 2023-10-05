/*
 * @Author: 米亚流年 miyaliunian@gmail.com
 * @Date: 2023-10-05 10:03:40
 * @LastEditors: 米亚流年 miyaliunian@gmail.com
 * @LastEditTime: 2023-10-05 11:32:58
 * @FilePath: /v-scale-screen/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
  plugins: [
    vue(),
    dts({ outputDir: 'dist/types' }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
})
