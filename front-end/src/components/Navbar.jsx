
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import bookmarkNavIcon from '../image/bookmarkNav.svg';
import selectHomeIcon from '../image/selectHome.svg';
import homeIcon from '../image/home.svg';
import mypageIcon from '../image/mypage.svg';
import gpsIcon from '../image/gps.svg';
import { getUserInfo } from '../api'; // 사용자 정보를 가져오는 함수
import axios from 'axios';

const Navbar = ({ currentPath, updateLocation, isAuthenticated, refreshToken, setToken }) => {
    const navigate = useNavigate();
    
    /*useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserInfo(token)
                .then(userData => {
                    setIsLoggedIn(true); // 사용자가 로그인 되어 있으면 true로 설정
                })
                .catch(() => {
                    setIsLoggedIn(false);
                });
        }
    }, []);*/

    const handleLinkClick = async (path) => {
        console.log(isAuthenticated);
        console.log(!isAuthenticated);
        console.log(path);
        console.log(!isAuthenticated && (path === '/mypage' || path === '/myplace'))
        if (!isAuthenticated && (path === '/mypage' || path === '/myplace')) {
            console.log("로그인 안되어 있음.")
            navigate('/login'); // 로그인 안 되어 있으면 로그인 페이지로 이동
        } else {
            console.log("로그인 되어 있음.")
            //토큰 재발급 로직
            try {
                const refreshResponse = await axios.get(`${baseUrl}/refresh`, {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                });
                const token = refreshResponse.data.data;
                console.log("token : "+ token);
                localStorage.setItem('token', token);  // JWT 토큰을 로컬 스토리지에 저장
                setToken(token);
            } catch (error) {
                // localStorage.removeItem('refreshToken');
                navigate('/login'); // 로그인 안 되어 있으면 로그인 페이지로 이동
            }
            navigate(path); // 로그인 되어 있으면 원래 경로로 이동
        }
    };    

    const isHome = currentPath === '/';
    const isMyPage = currentPath === '/mypage';

    return (
        <div className='Bottom'>
            {!isMyPage && (
                <button className='gps' onClick={updateLocation}>
                    <img src={gpsIcon} alt="GPS Icon" />
                </button>
            )}
            <div className="Navbar">
                <button className='bookmarkNav' onClick={() => handleLinkClick('/myplace')}>
                    <img src={bookmarkNavIcon} alt="Bookmark Icon" />내장소
                </button>
                <button className='selectHome' onClick={() => navigate('/')}>
                    <img src={isHome ? selectHomeIcon : homeIcon} alt="Home Icon" />홈
                </button>
                <button className='mypage' onClick={() => handleLinkClick('/mypage')}>
                    <img src={mypageIcon} alt="MyPage Icon" />마이페이지
                </button>
            </div>
        </div>
    );
};

export default Navbar;