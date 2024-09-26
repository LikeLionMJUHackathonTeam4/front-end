import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginCallback, getUserInfo } from '../api';
import KakaoLoginButton from './KakaoLoginButton';

const Auth = ({ setUser, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // 이미 토큰이 존재한다면 바로 사용자 정보를 가져옴
      getUserInfo(token)
        .then(userData => {
          setUser(userData);
          navigate('/'); // 메인 페이지로 이동
        })
        .catch(error => {
          console.error('유효하지 않은 토큰입니다:', error);
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log('Received code:', code);

      if (code) {
        // code가 존재할 때만 로그인 콜백을 실행합니다.
        console.log('카카오 로그인 코드:', code);

        kakaoLoginCallback(code)
          .then(token => {
            console.log('받은 토큰:', token);
            localStorage.setItem('token', token);
            setToken(token);
            return getUserInfo(token); // 받은 토큰으로 사용자 정보를 가져옴
          })
          .then(userData => {
            console.log('사용자 정보:', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            navigate('/'); // 로그인 후 메인 페이지로 이동
          })
          .catch(error => {
            console.error('로그인 처리 중 오류 발생:', error);
            navigate('/login');
          });
      }
    }
  }, [navigate, setUser, setToken]);

  return (
    <div>
      <KakaoLoginButton />
    </div>
  );
};

export default Auth;
