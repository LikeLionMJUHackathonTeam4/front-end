import '../styles/TopButton.css'
import toiletIcon from '../image/toilet.svg'
import smokingIcon from '../image/smoking.svg'
import bookmarkIcon from '../image/bookmark.svg'

const TopButton = () => {
    return (
        <div className="TopButton">
            <button className="toilet">
                <img src={toiletIcon} /> 화장실
            </button>
            <button className="smoking">
                <img src={smokingIcon} /> 흡연구역
            </button>
            <button className="bookmark">
                <img src={bookmarkIcon} /> 내 장소
            </button>
        </div>
    )
}

export default TopButton;