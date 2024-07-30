import '../styles/Navbar.css'
import bookmarkNavIcon from '../image/bookmarkNav.svg'
import homeIcon from '../image/home.svg'
import mypageIcon from '../image/mypage.svg'
import gpsIcon from '../image/gps.svg'

const Navbar = () => {
    return (
        <>
            <div className="Navbar">
                <button className='bookmarkNav'>
                    <img src={bookmarkNavIcon} /> <br /> 내장소
                </button>
                <button className='home'>
                    <img src={homeIcon} /> <br /> 홈
                </button>
                <button className='mypage'>
                    <img src={mypageIcon} /> <br /> 마이페이지
                </button>
            </div>
            <button className='gps'>
                <img src={gpsIcon} />
            </button>
        </>
    )
}

export default Navbar;