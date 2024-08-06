import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import bookmarkNavIcon from '../image/bookmarkNav.svg';
import selectHomeIcon from '../image/selectHome.svg';
import homeIcon from '../image/home.svg';
import mypageIcon from '../image/mypage.svg';
import gpsIcon from '../image/gps.svg';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='Bottom'>
            {currentPath !== '/mypage' && (
                <button className='gps'>
                    <img src={gpsIcon} alt="GPS Icon" />
                </button>
            )}
            <div className="Navbar">
                <Link to='/myplace' className='bookmarkNav'>
                    <img src={bookmarkNavIcon} alt="Bookmark Icon" />내장소
                </Link>
                <Link to='/' className='selectHome'>
                    <img src={currentPath === '/' ? selectHomeIcon : homeIcon} alt="Home Icon" />홈
                </Link>
                <Link to='/mypage' className='mypage'>
                    <img src={mypageIcon} alt="MyPageIcon" />마이페이지
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
