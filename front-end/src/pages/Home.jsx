import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import MapSearch from '../components/MapSearch';
import TopButton from '../components/TopButton';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import axios from 'axios';
import BottomSheetModal from '../components/BottomSheetModal'; // 바텀시트 모달 컴포넌트 임포트

const Home = (isAuthenticated, refreshToken, setToken, myToilet, mySmoke) => {
    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const baseUrl = endpoint + '/api';

    const location = useLocation();
    const mapRef = useRef();
    const [toilets, setToilets] = useState(myToilet); // 화장실 데이터 상태
    const [smoke, setSmoke] = useState(mySmoke); // 흡연구역 데이터 상태
    const [showToiletMarkers, setShowToiletMarkers] = useState(false); // 마커 표시 여부
    const [showSmokeMarkers, setShowSmokeMarkers] = useState(false);
    const [selectedToilet, setSelectedToilet] = useState(null); // 선택된 화장실 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

    const [isTracking, setIsTracking] = useState(false); // 추적 상태 관리



    // 공공 화장실 데이터 가져오기 함수
    const fetchToiletData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/toilets/all`); // 실제 API 경로로 변경
            if (response.data && response.data.code === 200) {
                console.log('공공 화장실 데이터:', response.data.data);
                setToilets(response.data.data); // 공공 화장실 데이터 상태 업데이트
                if (mapRef.current && showToiletMarkers) {
                    mapRef.current.addMarkers(response.data.data); // 공공 화장실 마커 추가
                }
            } else {
                console.error('공공 화장실 데이터를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('공공 화장실 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    //흡연구역 데이터 가져오기 함수
    const fetchToSmokeData = async() => {
        try {
            const response = await axios.get(`${baseUrl}/smoke/all`);
            if (response.data && response.data.code === 200) {
                console.log('흡연구역 데이터:', response.data.data);
                setSmoke(response.data.data); // 흡연구역 데이터 상태 업데이트
                if (mapRef.current && showSmokeMarkers) {
                    mapRef.current.addMarkers(response.data.data); // 흡연구역 마커 추가
                }
            } else {
                console.error('흡연구역 데이터를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('흡연구역 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // // 내 장소에 저장된 화장실 데이터 가져오기 함수
    // const fetchMyPlaceToilets = async () => {
    //     try {
    //         const response = await axios.get(`${baseUrl}/myplace/toilets`); // 내 장소 화장실 API 경로
    //         if (response.data && response.data.code === 200) {
    //             // 이전 화장실 목록과 합치기
    //             setToilets((prevToilets) => [...prevToilets, ...response.data.data]); 
    //             if (mapRef.current && showToiletMarkers) {
    //                 mapRef.current.addMarkers(response.data.data); // 내 장소 화장실 마커 추가
    //             }
    //         } else {
    //             console.error('저장된 화장실 데이터를 가져오는 데 실패했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('내 장소 화장실 데이터를 가져오는 중 오류 발생:', error);
    //     }
    // };

    // // 내 장소에 저장된 흡연구역 데이터 가져오기 함수
    // const fetchMyPlaceSmoke = async () => {
    //     try {
    //         const response = await axios.get(`${baseUrl}/my/smoke/all`); // 내 장소 흡연구역 API 경로
    //         if (response.data && response.data.code === 200) {
    //             // 이전 흡연구역 목록과 합치기
    //             setSmoke((prevSmoke) => [...prevSmoke, ...response.data.data]);
    //             if (mapRef.current && showSmokeMarkers) {
    //                 mapRef.current.addMarkers(response.data.data); // 내 장소 흡연구역 마커 추가
    //             }
    //         } else {
    //             console.error('저장된 흡연구역 데이터를 가져오는 데 실패했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('내 장소 흡연구역 데이터를 가져오는 중 오류 발생:', error);
    //     }
    // };

    // 마커 클릭 시 바텀시트 모달 띄우기
    const handleMarkerClick = (toilet) => {
        console.log('선택된 화장실:', toilet); // 선택된 화장실 정보 확인
        setSelectedToilet(toilet);
        setIsModalOpen(true); // 모달 열기
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    // 마커 표시 여부에 따라 데이터 가져오기
    useEffect(() => {
        if (showToiletMarkers) {
            fetchToiletData(); // 공공 화장실 데이터 가져오기
            // fetchMyPlaceToilets(); // 내 장소 화장실 데이터 가져오기
        } else {
            if (mapRef.current) {
                mapRef.current.addMarkers([]); // 마커를 숨기기 위해 빈 배열을 전달
            }
        }
    }, [showToiletMarkers]); // showToiletMarkers가 변경될 때마다 실행

    useEffect(() => {
        if (showSmokeMarkers) {
            fetchToSmokeData(); // 흡연구역 데이터 가져오기
            // fetchMyPlaceSmoke(); // 내 장소 흡연구역 데이터 가져오기
        } else {
            if (mapRef.current) {
                mapRef.current.addMarkers([]);
            }
        }
    }, [showSmokeMarkers]); // showSmokeMarkers가 변경될 때마다 실행

    // 위치 재검색 함수
    const updateLocation = () => {
        if (mapRef.current) {
            mapRef.current.updateLocation(); // Map 컴포넌트의 updateLocation 호출
            setIsTracking(true); // 위치 추적 시작
        }
    };

    const stopTracking = () => {
        setIsTracking(false); // 위치 추적 중지
    };

    // 사용자가 지도를 이동할 때 추적을 중지하는 함수
    // const handleMapDrag = () => {
    //     if (isTracking) {
    //         const watchId = localStorage.getItem('watchId');
    //         if (watchId) {
    //             navigator.geolocation.clearWatch(watchId); // 추적 중지
    //             localStorage.removeItem('watchId');
    //         }
    //         setIsTracking(false);
    //     }
    // };

    return (
        <div className='Home'>
            <div className="map-wrapper">
                <Map ref={mapRef} toilets={toilets} smoke={smoke} isTracking={isTracking} stopTracking={stopTracking} onMarkerClick={handleMarkerClick} /> {/* ref로 Map 컴포넌트에 접근 */}
                <MapSearch mapRef={mapRef} />
                <TopButton
                    fetchToiletData={fetchToiletData} fetchToSmokeData={fetchToSmokeData}
                    showToiletMarkers={showToiletMarkers} showSmokeMarkers={showSmokeMarkers}
                    setShowToiletMarkers={setShowToiletMarkers} setShowSmokeMarkers={setShowSmokeMarkers}
                />
            </div>

            <Navbar isAuthenticated = {isAuthenticated.isAuthenticated} currentPath={location.pathname} updateLocation={updateLocation} refreshToken={refreshToken} setToken={setToken} isTracking={isTracking} />
            {/* 바텀시트 모달 */}
            <BottomSheetModal toilet={selectedToilet} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Home;
