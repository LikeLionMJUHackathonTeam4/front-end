import '../styles/MapSearch.css'
import searchIcon from '../image/search.svg'
import { useNavigate } from 'react-router-dom';

const MapSearch = () => {
    const navigate = useNavigate();
    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <div className="MapSearch">
            <button className='SearchBox' onClick={handleSearchClick}>
                <img className='searchIcon' src={searchIcon} />
            </button>
        </div>
    )
}

export default MapSearch;
