// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { kakaoLoginCallback, getUserInfo } from '../api';
// import KakaoLoginButton from './KakaoLoginButton';

// const Auth = ({ setUser, setToken }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//         localStorage.setItem('token', token);
//         setIsAuthenticated(true);
//     } else {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//     }
// }, [token]);


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');

//     if (token) {
//       getUserInfo(token)
//           .then(userData => {
//               setUser(userData);
//               navigate('/');
//           })
//           .catch(() => {
//               localStorage.removeItem('token');
//               localStorage.removeItem('user');
//               navigate('/login');
//           });
//   } else if (code) {
//       kakaoLoginCallback(code)
//           .then(token => {
//               setToken(token);
//               localStorage.setItem('token', token);
//               return getUserInfo(token);
//           })
//           .then(userData => {
//               setUser(userData);
//               localStorage.setItem('user', JSON.stringify(userData));
//               navigate('/');
//           })
//           .catch(() => {
//               navigate('/login');
//           });
//   } else {
//       navigate('/login');
//   }
// }, [navigate, setUser, setToken]);

// return <KakaoLoginButton />;
// };

// export default Auth;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({ setUser, setToken, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const baseUrl = endpoint+'/oauth';

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    console.log(code);
                    const response = await axios.get(`${baseUrl}/callback?code=${code}`);
                    const token = response.data.data;
                    console.log(token);
                    localStorage.setItem('token', token);  // JWT 토큰을 로컬 스토리지에 저장
                    setToken(token);

                    // 토큰으로 사용자 정보 가져오기
                    const userResponse = await axios.get(`${baseUrl}/user`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(userResponse.data.data);
                    setIsAuthenticated(true);
                    navigate('/');  // 홈 페이지로 리다이렉트
                } catch (error) {
                    console.error('Error during callback handling:', error);
                }
            }
        };

        fetchToken();
    }, [navigate, setToken, setUser]);

    return <div>로그인 중입니다...</div>;
};

export default Auth;