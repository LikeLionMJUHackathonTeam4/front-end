import React, { useState } from 'react';
import searchIcon from '../image/search.svg';
import '../styles/MapSearch.css';

const MapSearch = ({ mapRef }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // 검색 함수
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            console.error('검색어를 입력하세요');
            return;
        }

        if (mapRef.current) {
            mapRef.current.searchPlace(searchQuery); // Map 컴포넌트의 searchPlace 메서드 호출
        }
    };

    return (
        <div className="MapSearch">
            <div className="search-wrapper">
                <input
                    type="text"
                    className="SearchBox"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색할 장소를 입력하세요"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Enter 키로도 검색 가능
                />
                <button className='search-button' onClick={handleSearch}>
                    <img className='searchIcon' src={searchIcon} alt="검색" />
                </button>
            </div>
        </div>
    );
};

export default MapSearch;
