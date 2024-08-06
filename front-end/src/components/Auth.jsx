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
    if (token) {
      getUserInfo(token)
        .then(userData => setUser(userData))
        .catch(error => console.error('Get User Info Error:', error));
    }
  }, [token]);

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
