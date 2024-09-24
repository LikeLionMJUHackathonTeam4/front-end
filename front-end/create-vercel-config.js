// create-vercel-config.js
import { writeFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv'; // dotenv 패키지 불러오기

// 환경 변수 로드
dotenv.config();

// 환경 변수 값 가져오기
const apiUrl = process.env.VITE_BE_ENDPOINT;

if (!apiUrl) {
    console.error('환경 변수 VITE_BE_ENDPOINT가 설정되지 않았습니다.');
    process.exit(1); // 오류 발생 시 스크립트 종료
}
console.log('VITE_BE_ENDPOINT:', apiUrl);

// vercel.json 파일의 생성 경로를 프로젝트 루트로 설정
const vercelJsonPath = path.resolve(__dirname, 'vercel.json');

// vercel.json 파일 생성
const vercelConfig = {
  rewrites: [
    {
        source: '/api/(.*)',
        destination: `${apiUrl}/api/$1`
    },
    {
        source: '/oauth/(.*)',
        destination: `${apiUrl}/oauth/$1`
    }
  ]
};

// vercel.json 파일을 생성하고 저장
try {
  writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
  console.log('vercel.json 파일이 성공적으로 생성되었습니다.');
} catch (error) {
  console.error('vercel.json 파일 생성 중 오류 발생:', error);
  process.exit(1); // 오류 발생 시 스크립트 종료
}