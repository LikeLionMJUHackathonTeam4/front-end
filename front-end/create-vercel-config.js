// create-vercel-config.js
const fs = require('fs');

// 환경 변수 값 가져오기
const apiUrl = process.env.VITE_BE_ENDPOINT;

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

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));