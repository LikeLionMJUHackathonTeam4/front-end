import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import MapSearch from '../components/MapSearch';
import TopButton from '../components/TopButton';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import axios from 'axios';

const Home = () => {

    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const baseUrl = endpoint+'/api';

    const location = useLocation();
    const mapRef = useRef(null);
    const [toilets, setToilets] = useState([]);

    // 화장실 데이터 불러오기 함수
    const fetchToiletData = async () => {
        try {
            const response = await axios.get(`/api/toilets/all`); // 실제 API 경로로 변경
            if (response.data && response.data.code === 200) {
                console.log('응답 데이터:', response.data);
                console.error('화장실 데이터 출력:', response.data.data);
                setToilets(response.data.data);
                if (mapRef.current) {
                    mapRef.current.addMarkers(response.data.data); // Map 컴포넌트의 addMarkers 함수 호출
                }
            } else {
                console.error('데이터를 가져오는 데 실패했습니다.');
            }
            // if (Array.isArray(response.data)) { // 응답 데이터가 배열인지 확인
            //     setToilets(response.data); // 배열인 경우 상태에 저장
            //     if (mapRef.current) {
            //         mapRef.current.addMarkers(response.data); // Map 컴포넌트의 addMarkers 함수 호출
            //     }
            // } else {
            //     console.error('화장실 데이터가 배열 형태가 아닙니다:', response.data);
            // }
        } catch (error) {
            console.error('화장실 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // useEffect(() => {
    //     const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    //     axios.get(endpoint+'/api/toilets/all')
    //       .then(response => {
    //         if (response.data && response.data.code === 200) {
    //           setToilets(response.data.data);
    //         } else {
    //           console.error('데이터를 가져오는 데 실패했습니다.');
    //         }
    //       })
    //       .catch(err => {
    //         console.error('API 호출 오류:', err);
    //       });
    //   }, []);

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
        <TopButton fetchToiletData={fetchToiletData}/>
        <Navbar currentPath={location.pathname} updateLocation={updateLocation} />
        </div>
    );
};

export default Home;
