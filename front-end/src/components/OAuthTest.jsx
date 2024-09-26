import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginCallback, getUserInfo } from '../api'; // API 모듈에서 로그인 콜백과 사용자 정보 가져오기
import KakaoLoginButton from './KakaoLoginButton'; // KakaoLoginButton 컴포넌트 import
import '../styles/OAuthTest.css'; // CSS 파일 import

const OAuthTest = ({ setUser, setToken }) => {
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      try {
        // 카카오 로그인 콜백 처리
        const token = await kakaoLoginCallback(code);
        localStorage.setItem('token', token); // JWT 대신 token으로 통일
        setToken(token);
        
        // 사용자 정보 가져오기
        const userData = await getUserInfo(token);
        setUser(userData);
        // setLoginStatus('Login successful!');
        navigate('/'); // 로그인 후 메인 페이지로 리디렉션
      } catch (error) {
        console.error('Error during callback handling:', error);
        // setLoginStatus(Login failed: ${error.response?.data?.message || 'Unknown error'});
      }
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div className="oauth-test-container">
        <strong>흡변구역 서비스를 이용하려면 카카오 로그인이 필요합니다</strong>
      <KakaoLoginButton />
    </div>
  );
};

export default OAuthTest;