import '../styles/MapSearch.css'
import searchIcon from '../image/search.svg'

const MapSearch = () => {
    return (
        <div className="MapSearch">
            <button className='SearchBox'>
                <img className='searchIcon' src={searchIcon} />
            </button>
        </div>
    )
}

export default MapSearch;