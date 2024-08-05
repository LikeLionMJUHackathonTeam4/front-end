import '../styles/TopNav.css'
import { Link } from 'react-router-dom'
import backIcon from '../image/back.svg'
import copyIcon from '../image/copy.svg'
import bookmarkLineIcon from '../image/bookmarkLine.svg'
import manIcon from '../image/man.svg'
import womanIcon from '../image/woman.svg'
import disabledIcon from '../image/disabled.svg'
import noneIcon from '../image/none.svg'
import alarmIcon from '../image/alarm.svg'
import cctvIcon from '../image/cctv.svg'
import babyIcon from '../image/baby.svg'

const TopNav = () => {
    return (
        <>
            <div className='TopNav'>
                <div className='Back'>
                    <Link to='/info' className='backIcon'>
                        <img src={backIcon} />
                    </Link>
                </div>
                <div className='NavBar'>
                    <Link to='/description' className='Description'>정보</Link>
                    <Link to='/review' className='Review'>후기</Link>
                </div>
                <div className='nav-bar'>
                    <svg width="478" height="2" viewBox="0 0 478 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="1" x2="478.004" y2="1" stroke="#E9E9EB" strokeWidth="2"/>
                    <path d="M102.002 1L134.002 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className='DescriptionTitle'>
                    <p className='LocationName-desc'>서대문문화체육회관</p>
                    <p className='type-desc'>개방화장실</p>
                    <button className='DescBookmark'>
                        <img src={bookmarkLineIcon} />
                    </button>
                </div>
                <div className='Score-container-desc'>
                    <div>대충 별이 들어갈 자리</div>
                </div>
                <div className='Time-container-desc'>
                    <p className='time-desc'>정시 06:00~22:00</p>
                </div>
                <div className='Address-container-desc'>
                    <p className='address-desc'>지번 : 서울시 서대문구 홍은동 산 26-155
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                    <p className='Road-address-desc'>도로명 : 서울특별시 서대문구 백련사길 39
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                </div>
            </div>

            <div className='Middle'>
                <div className='circle'>
                    <img src={manIcon} />
                    <img src={womanIcon} />
                    <img src={disabledIcon} />
                    <img src={noneIcon} />
                    <img src={alarmIcon} />
                    <img src={cctvIcon} />
                    <img src={babyIcon} />
                </div>
                <div className='mans'>
                    <div>
                        <p className='ManType'>남성용</p>
                        <p>대변기수</p>
                        <div className='long-line'></div>
                        <p>2</p>
                    </div>
                    
                    <div className='pee'>
                        <p>소변기수</p>
                        <div className='long-line'></div>
                        <p>2</p>
                    </div>

                    <div className='disabled-poop'>
                        <p>장애인용 대변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>

                    <div>
                        <p className='disabled-pee'>장애인용 소변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>

                    <div>
                        <p className='child-poop'>어린이용 대변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>

                    <div>
                        <p className='child-pee'>어린이용 소변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>
                </div>

                <div className='women'>
                    <div>
                        <p className='WomanType'>여성용</p>
                        <p>대변기수</p>
                        <div className='long-line'></div>
                        <p>2</p>
                    </div>
                    
                    <div>
                        <p className='disabled-poop'>장애인용 대변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>

                    <div>    
                        <p className='child-poop'>어린이용 대변기수</p>
                        <div className='short-line'></div>
                        <p>2</p>
                    </div>
                </div>
            </div>

            <div className='MoreDesc'>
                <p className='MoreDesc-title'>상세정보</p>
                <div>
                    <p className='MoreDesc-left'>비상벨 설치 장소</p>
                    <p className='MoreDesc-right'>여자화장실</p>
                </div>

                <div>
                    <p className='MoreDesc-left'>입구 CCTV 설치 여부</p>
                    <p className='MoreDesc-right'>설치됨</p>
                </div>

                <div>
                    <p className='MoreDesc-left'>기저귀 교환대 장소</p>
                    <p className='MoreDesc-right'>여자화장실</p>
                </div>
            </div>
        </>
    )
}

export default TopNav;