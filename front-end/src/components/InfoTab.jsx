import '../styles/InfoTab.css'
import backIcon from '../image/back.svg'
import copyIcon from '../image/copy.svg'
import bookmarkLineIcon from '../image/bookmarkLine.svg'
import shareIcon from '../image/share.svg'

const InfoTab = () => {
    return (
        <>
            <div>
                <button className='Back'>
                    <img src={backIcon} />
                </button>
                <button>
                    장소, 주소 검색
                </button>
            </div>
            <div className='InfoTab'>
                <div className='InfoTitle'>
                    <p>서대문문화체육회관</p>
                    <p className='type'>개방화장실</p>
                </div>
                <div className='time'>
                    <p>정시 06:00~22:00</p>
                </div>
                <div className='address'>
                    <p>지번 : ~
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                    <p>도로명 : ~
                        <button>
                            <img src={copyIcon} />
                        </button>
                    </p>
                </div>
                <div className='InfoButton'>
                    <button className='InfoBookmark'>
                        <img src={bookmarkLineIcon} />
                    </button>
                    <button className='Share'>
                        <img src={shareIcon} />
                    </button>
                </div>
                <button className='MoreInfo'>상세보기</button>
            </div>
        </>
    )
}

export default InfoTab;