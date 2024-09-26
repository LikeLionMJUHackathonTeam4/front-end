import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginCallback, getUserInfo } from '../api';
import KakaoLoginButton from './KakaoLoginButton';

const Auth = ({ setUser, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }
}, [token]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (token) {
      getUserInfo(token)
          .then(userData => {
              setUser(userData);
              navigate('/');
          })
          .catch(() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
          });
  } else if (code) {
      kakaoLoginCallback(code)
          .then(token => {
              setToken(token);
              localStorage.setItem('token', token);
              return getUserInfo(token);
          })
          .then(userData => {
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));
              navigate('/');
          })
          .catch(() => {
              navigate('/login');
          });
  } else {
      navigate('/login');
  }
}, [navigate, setUser, setToken]);

return <KakaoLoginButton />;
};

export default Auth;