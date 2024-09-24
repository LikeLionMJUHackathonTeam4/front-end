import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'; // dotenv 패키지 불러오기

// 환경 변수 로드
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_BE_ENDPOINT, // 백엔드 주소
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '/oauth': {
  //       target: process.env.VITE_BE_ENDPOINT, // 백엔드 주소
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/oauth/, ''),
  //     },
  //   }
  // }
});
