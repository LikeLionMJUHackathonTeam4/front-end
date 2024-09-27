import React, { useState, useRef } from 'react';
import Map from '../components/Map.jsx'; // Map 컴포넌트 가져오기
import { Link } from 'react-router-dom'
import backIcon from '../image/back.svg'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null); // Map 컴포넌트를 참조

  // 검색 함수
  const handleSearch = () => {
    if (mapRef.current) {
      mapRef.current.searchPlace(searchQuery); // Map 컴포넌트의 searchPlace 메서드 호출
    }
  };

  return (
    <div className="SearchPage">
        <div className='InfoSearch-container'>
            <Link to='/' className='backIcon-Info'>
                <img src={backIcon} />
            </Link>
            
            <input
                type="text"
                className="Info-Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="장소·주소 검색"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Enter 키로도 검색 가능
            />
            <button onClick={handleSearch} className="search-button">
                검색
            </button>
        </div>

        {/* Map 컴포넌트 */}
        <Map ref={mapRef} />
    </div>
  );
};

export default Search;
