import React from 'react';
import { getKakaoLoginUrl } from '../api'; // 카카오 로그인 URL 가져오는 함수
import kakaoLoginImage from '../image/KakaoTalk_Login.png'; // 카카오 로그인 이미지
import '../styles/KakaoLoginButton.css'; // 스타일 파일

const KakaoLoginButton = () => {
    const handleLogin = async () => {
        try {
            const loginUrl = await getKakaoLoginUrl();
            window.location.href = loginUrl; // 카카오 로그인 페이지로 이동
        } catch (error) {
            console.error('Error fetching Kakao login URL:', error);
        }
    };

    return (
        <button className="kakao-login-button" onClick={handleLogin}>
            <img src={kakaoLoginImage} alt="카카오 로그인" />
        </button>
    );
};

export default KakaoLoginButton;
