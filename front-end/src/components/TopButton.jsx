import '../styles/TopButton.css'
import toiletIcon from '../image/toilet.svg'
import smokingIcon from '../image/smoking.svg'
import bookmarkIcon from '../image/bookmark.svg'

const TopButton = ({ showToiletMarkers, setShowToiletMarkers, setShowSmokeMarkers }) => {
    const handleToiletButtonClick = () => {
        // 마커 표시 여부 토글
        setShowToiletMarkers(prev => !prev);
    };

    const handleSmokeButtonClick = () => {
        // 마커 표시 여부 토글
        setShowSmokeMarkers(prev => !prev);
    };

    return (
        <div className="TopButton">
            <button className="toilet" onClick={handleToiletButtonClick}>
                <img src={toiletIcon} /> 화장실
            </button>
            <button className="smoking" onClick={handleSmokeButtonClick}>
                <img src={smokingIcon} /> 흡연구역
            </button>
            <button className="bookmark">
                <img src={bookmarkIcon} /> 내 장소
            </button>
        </div>
    )
}

export default TopButton;