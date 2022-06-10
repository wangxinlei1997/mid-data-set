/*
 * @Author: 王欣磊
 * @Date: 2022-06-10 09:53:40
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-06-10 14:34:29
 * @Description: 
 * @FilePath: /mmsi-demo-v3/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build:{
    outDir: 'docs',
  }
})
