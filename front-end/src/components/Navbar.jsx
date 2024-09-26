// import '../styles/Navbar.css';
// import bookmarkNavIcon from '../image/bookmarkNav.svg';
// import selectHomeIcon from '../image/selectHome.svg';
// import homeIcon from '../image/home.svg';
// import mypageIcon from '../image/mypage.svg';
// import gpsIcon from '../image/gps.svg';
// import { Link } from 'react-router-dom';

// const Navbar = ({ currentPath, updateLocation }) => {
//     const isHome = currentPath === '/';
//     const isMyPage = currentPath === '/mypage';

//     return (
//         <div className='Bottom'>
//             {!isMyPage && (
//                 <button className='gps' onClick={updateLocation}>
//                     <img src={gpsIcon} alt="GPS Icon" />
//                 </button>
//             )}
//             <div className="Navbar">
//                 <Link to='/myplace' className='bookmarkNav'>
//                     <img src={bookmarkNavIcon} alt="Bookmark Icon" />내장소
//                 </Link>
//                 <Link to='/' className='selectHome'>
//                     <img src={isHome ? selectHomeIcon : homeIcon} alt="Home Icon" />홈
//                 </Link>
//                 <Link to='/mypage' className='mypage'>
//                     <img src={mypageIcon} alt="MyPage Icon" />마이페이지
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Navbar;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import bookmarkNavIcon from '../image/bookmarkNav.svg';
import selectHomeIcon from '../image/selectHome.svg';
import homeIcon from '../image/home.svg';
import mypageIcon from '../image/mypage.svg';
import gpsIcon from '../image/gps.svg';
import { getUserInfo } from '../api'; // 사용자 정보를 가져오는 함수

const Navbar = ({ currentPath, updateLocation, isAuthenticated }) => {
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

    const handleLinkClick = (path) => {
        if (!isAuthenticated && (path === '/mypage' || path === '/myplace')) {
            navigate('/login'); // 로그인 안 되어 있으면 로그인 페이지로 이동
        } else {
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