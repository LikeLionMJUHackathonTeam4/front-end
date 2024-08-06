import React from 'react';
import { getKakaoLoginUrl } from '../api'; // API 모듈에서 URL 가져오기
import kakaoLoginImage from '../image/KakaoTalk_Login.png'; // 이미지 파일 경로
import '../styles/KakaoLoginButton.css'; // CSS 파일 경로

const KakaoLoginButton = () => {
  const handleLogin = async () => {
    try {
      const loginUrl = await getKakaoLoginUrl();
      window.location.href = loginUrl; // 카카오 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('Error fetching Kakao login URL:', error);
    }
  };

  return (
    <button className="kakao-login-button" onClick={handleLogin}>
      <img src={kakaoLoginImage} alt="카카오 로그인" className="kakao-login-image" />
    </button>
  );
};

export default KakaoLoginButton;
