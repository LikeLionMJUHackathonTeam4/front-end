import React, { useEffect, useState } from 'react';
import { getKakaoLoginUrl, kakaoLoginCallback, getUserInfo, logout } from '../api';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = async () => {
    try {
      const loginUrl = await getKakaoLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
        console.error('Error fetching Kakao login URL:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      kakaoLoginCallback(code)
        .then(token => {
          localStorage.setItem('token', token);
          setToken(token);
        })
        .catch(error => console.error('Callback Error:', error));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        getUserInfo(token)
            .then(userData => {
                if (userData) {
                    setUser(userData); // 유저 정보가 있으면 저장
                } else {
                    // user가 없을 경우 재로그인
                    navigate('/login');
                }
            })
            .catch(() => {
                navigate('/login');  // 오류 발생 시 로그인 페이지로 리디렉션
            });
    } else {
        navigate('/login');  // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout(token);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div>
      {!token ? (
        <button onClick={handleLogin}>Login with Kakao</button>
      ) : (
        <div>
          <h2>Welcome, {user?.nickname}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
