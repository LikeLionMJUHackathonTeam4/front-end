import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../components/KakaoLoginButton'; // 카카오 로그인 버튼 컴포넌트
import '../styles/LoginPage.css'

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // 이미 로그인 되어 있으면 리디렉션
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="login-page">
            <h2>해당 서비스를 이용하려면 로그인이 필요합니다.</h2>
            <KakaoLoginButton />
        </div>
    );
};

export default LoginPage;