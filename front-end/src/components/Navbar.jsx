import '../styles/Navbar.css';
import bookmarkNavIcon from '../image/bookmarkNav.svg';
import selectHomeIcon from '../image/selectHome.svg';
import homeIcon from '../image/home.svg';
import mypageIcon from '../image/mypage.svg';
import gpsIcon from '../image/gps.svg';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath, updateLocation }) => {
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
                <Link to='/myplace' className='bookmarkNav'>
                    <img src={bookmarkNavIcon} alt="Bookmark Icon" />내장소
                </Link>
                <Link to='/' className='selectHome'>
                    <img src={isHome ? selectHomeIcon : homeIcon} alt="Home Icon" />홈
                </Link>
                <Link to='/mypage' className='mypage'>
                    <img src={mypageIcon} alt="MyPage Icon" />마이페이지
                </Link>
            </div>
        </div>
    );
}

export default Navbar;