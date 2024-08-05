import '../styles/Navbar.css'
import bookmarkNavIcon from '../image/bookmarkNav.svg'
import selectHomeIcon from '../image/selectHome.svg'
import homeIcon from '../image/home.svg'
import mypageIcon from '../image/mypage.svg'
import gpsIcon from '../image/gps.svg'
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath }) => {
    const isHome = currentPath === '/';
    const isMyPage = currentPath === '/mypage';

    return (
        <div className='Bottom'>
            {!isMyPage && (
                <button className='gps'>
                    <img src={gpsIcon} />
                </button>
            )}
            <div className="Navbar">
                <Link to='/myplace' className='bookmarkNav'>
                    <img src={bookmarkNavIcon} />내장소
                </Link>
                <Link to='/' className='selectHome'>
                    <img src={isHome ? selectHomeIcon : homeIcon} />홈
                </Link>
                <Link to='/mypage' className='mypage'>
                    <img src={mypageIcon} />마이페이지
                </Link>
            </div>
        </div>
    )
}

export default Navbar;