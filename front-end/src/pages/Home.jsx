import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import MapSearch from '../components/MapSearch';
import TopButton from '../components/TopButton';
import Navbar from '../components/Navbar';
import Map from '../components/Map';

const Home = ({ toilets }) => {
  const location = useLocation();
  const mapRef = useRef(null);

  const [toilets, setToilets] = useState(initialToilets);

  // 위치 재검색 함수
  const updateLocation = () => {
    if (mapRef.current) {
      mapRef.current.updateLocation();  // Map 컴포넌트의 updateLocation 함수 호출
    }
  };

  return (
    <div className='Home'>
      <Map ref={mapRef} toilets={toilets} />  {/* ref로 Map 컴포넌트에 접근 */}
      <MapSearch />
      <TopButton />
      <Navbar currentPath={location.pathname} updateLocation={updateLocation} />
    </div>
  );
};

export default Home;
