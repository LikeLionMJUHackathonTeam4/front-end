import '../styles/InfoTab.css'
import backIcon from '../image/back.svg'
import copyIcon from '../image/copy.svg'
import bookmarkLineIcon from '../image/bookmarkLine.svg'
import { Link } from 'react-router-dom'

const InfoTab = () => {
    return (
        <>
            <div className='InfoSearch-container'>
                <div className='InfoSearch'>
                    <Link to='/' className='backIcon-Info'>
                        <img src={backIcon} />
                    </Link>
                    <Link to='/search' className='Info-Search'>
                        장소·주소 검색
                    </Link>
                </div>
            </div>

            <div className='InfoTab'>
                <div className='InfoTitle'>
                    <p className='LocationName'>서대문문화체육회관</p>
                    <p className='type'>개방화장실</p>
                    <button className='InfoBookmark'>
                        <img src={bookmarkLineIcon} className='BookmarkLineIcon'/>
                    </button>
                </div>
                <div className='Score-container'>
                    <div>대충 별이 들어갈 자리</div>
                </div>
                <div className='Time-container'>
                    <p className='time'>정시 06:00~22:00</p>
                </div>
                <div className='Address-container'>
                    <p className='address'>지번 : 서울시 서대문구 홍은동 산 26-155
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                    <p className='Road-address'>도로명 : 서울특별시 서대문구 백련사길 39
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                </div>

                <Link to='/description' className='MoreInfo'>상세보기</Link>
            </div>
        </>
    )
}

export default InfoTab;